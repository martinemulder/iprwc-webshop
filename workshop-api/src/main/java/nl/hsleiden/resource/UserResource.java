package nl.hsleiden.resource;

import com.fasterxml.jackson.annotation.JsonView;
import com.google.inject.Singleton;
import io.dropwizard.auth.Auth;
import java.util.Collection;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import nl.hsleiden.View;
import nl.hsleiden.model.User;
import nl.hsleiden.service.UserService;


@Singleton
@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {

    private final UserService service;
    
    @Inject
    public UserResource(UserService service) {
        this.service = service;
    }
    
    @GET
    @JsonView(View.Public.class)
    @RolesAllowed("ADMIN")
    public Collection<User> retrieveAll() {
        return service.getAll();
    }
    
    @GET
    @Path("/{id}")
    @JsonView(View.Public.class)
    @RolesAllowed("GUEST")
    public User retrieve(@PathParam("id") int id) {
        return service.get(id);
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @JsonView(View.Protected.class)
//    public void create(@Valid User user) {
    public void create(User user) {
        service.add(user);
    }
    
    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @JsonView(View.Protected.class)
    @RolesAllowed("GUEST")
    public void update(@PathParam("id") int id, @Auth User authenticator, User user) {
        service.update(authenticator, id, user);
    }
    
    @DELETE
    @Path("/delete/{email}")
    @JsonView(View.Public.class)
    @RolesAllowed({"GUEST","ADMIN"})
    public void delete(@PathParam("email") String email, @Auth User authenticator) {
        System.out.println("Auth: " + authenticator);
        System.out.println(email);
        service.delete(email, authenticator);
    }
    
    @GET
    @Path("/me")
    @JsonView(View.Private.class)
    public User authenticate(@Auth User authenticator) {
        return authenticator;
    }

}
