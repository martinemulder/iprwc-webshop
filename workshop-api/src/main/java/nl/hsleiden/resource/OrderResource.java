package nl.hsleiden.resource;

import com.fasterxml.jackson.annotation.JsonView;
import com.google.inject.Singleton;
import io.dropwizard.auth.Auth;
import nl.hsleiden.View;
import nl.hsleiden.model.Order;
import nl.hsleiden.model.Product;
import nl.hsleiden.model.User;
import nl.hsleiden.service.OrderService;
import nl.hsleiden.service.ProductService;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.lang.reflect.Array;
import java.util.Collection;


@Singleton
@Path("/orders")
@Produces(MediaType.APPLICATION_JSON)
public class OrderResource {

    private final OrderService service;

    @Inject
    public OrderResource(OrderService service)
    {
        this.service = service;
    }
    
    @GET
    @JsonView(View.Public.class)
    public Collection<Order> retrieveAll()
    {
        return service.getAll();
    }

    @DELETE
    @Path("/delete/{id}")
    @RolesAllowed("ADMIN")
    public void delete(@PathParam("id") int id) {
        service.delete(id);
    }

//    @GET
//    @Path("/{id}")
//    @JsonView(View.Public.class)
//    @RolesAllowed("GUEST")
//    public User retrieve(@PathParam("id") int id)
//    {
//        return service.get(id);
//    }

//    @POST
//    @Consumes(MediaType.APPLICATION_JSON)
//    @JsonView(View.Public.class)
//    public void createOrder(Order order, @Auth User authenticator) {
//        System.out.println("Auth: "+authenticator);
//        System.out.println("Order: "+order);
//        order.setUserId(authenticator.getId());
//        service.add(order);
//    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @JsonView(View.Public.class)
    public void create(Product[] products, @Auth User authenticator) {

        for (Product product : products) {
            System.out.println(product);
        }
        service.add(products, authenticator.getId());
    }

    
//    @PUT
//    @Path("/{id}")
//    @Consumes(MediaType.APPLICATION_JSON)
//    @JsonView(View.Protected.class)
//    @RolesAllowed("GUEST")
//    public void update(@PathParam("id") int id, @Auth User authenticator, User user)
//    {
//        service.update(authenticator, id, user);
//    }
    
//    @DELETE
//    @Path("/{id}")
//    @RolesAllowed("ADMIN")
//    public void delete(@PathParam("id") int id)
//    {
//        service.delete(id);
//    }
    
//    @GET
//    @Path("/me")
//    @JsonView(View.Private.class)
//    public User authenticate(@Auth User authenticator)
//    {
//        return authenticator;
//    }

}
