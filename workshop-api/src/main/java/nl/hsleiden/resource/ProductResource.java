package nl.hsleiden.resource;

import com.fasterxml.jackson.annotation.JsonView;
import com.google.inject.Singleton;
import io.dropwizard.auth.Auth;
import nl.hsleiden.View;
import nl.hsleiden.model.Product;
import nl.hsleiden.model.User;
import nl.hsleiden.service.ProductService;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Collection;


@Singleton
@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
public class ProductResource {

    private final ProductService service;

    @Inject
    public ProductResource(ProductService service) {
        this.service = service;
    }
    
    @GET
    @JsonView(View.Public.class)
    public Collection<Product> retrieveAll() {
        return service.getAll();
    }
    
    @GET
    @Path("/{id}")
    @JsonView(View.Public.class)
    @RolesAllowed("GUEST")
    public Product retrieve(@PathParam("id") int id) {
        return service.get(id);
    }

    @POST
    @RolesAllowed("ADMIN")
    public void add(Product product, @Auth User authenticator) {
        service.add(product, authenticator);
    }

    @PUT
    @RolesAllowed("ADMIN")
    public void update(Product product, @Auth User authenticator) {
        service.update(product, authenticator);
    }
    
    @DELETE
    @Path("/{barcode}")
    @RolesAllowed("ADMIN")
    public void delete(@PathParam("barcode") int barcode, @Auth User authenticator) {
        service.delete(barcode, authenticator);
    }

}
