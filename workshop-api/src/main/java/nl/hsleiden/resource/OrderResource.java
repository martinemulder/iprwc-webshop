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
    public OrderResource(OrderService service) {
        this.service = service;
    }
    
    @GET
    @RolesAllowed("ADMIN")
    public Collection<Order> retrieveAll() {
        return service.getAll();
    }

    @GET
    @Path("/me")
    public Collection<Order> myOrders(@Auth User authenticator) {
        return service.getMyOrders(authenticator);
    }

    @DELETE
    @Path("/{orderNr}")
    @RolesAllowed("ADMIN")
    public void delete(@PathParam("orderNr") int orderNr, @Auth User authenticator) {
        service.delete(orderNr, authenticator);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void create(Product[] products, @Auth User authenticator) {
        service.add(products, authenticator.getId());
    }

}
