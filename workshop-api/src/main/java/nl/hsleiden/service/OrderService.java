package nl.hsleiden.service;

import nl.hsleiden.model.Order;
import nl.hsleiden.model.Product;
import nl.hsleiden.model.User;
import nl.hsleiden.persistence.OrderDAO;
import nl.hsleiden.persistence.ProductDAO;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.Collection;


@Singleton
public class OrderService extends BaseService<User> {

    private final OrderDAO dao;

    @Inject
    public OrderService(OrderDAO dao) {
        this.dao = dao;
    }
    
    public Collection<Order> getAll() {
        return dao.getAll();
    }

    public User getUser(int orderNr) {
        User user = dao.getUser(orderNr);
        return user;
    }

//    public Product get(int id) {
////        return requireResult(dao.get(id));
//    }
    
//    public void add(Product product) {
//        dao.add(product);
//    }
//
//    public void update(User authenticator, int id, Product product) {
//        // Check if this product exists
////        Product oldProduct = get(id);
//
//        if (authenticator.hasRole("ADMIN")) {
//            // Check if user has role admin
//            dao.update(id, product);
//
//        }
//
//    }
//
    public void delete(int id) {
        // Controleren of deze gebruiker wel bestaat
//        Order order = get(id);

        dao.delete(id);
    }

    public void add(Product[] products, int userId) {
        dao.add(products, userId);
    }

}
