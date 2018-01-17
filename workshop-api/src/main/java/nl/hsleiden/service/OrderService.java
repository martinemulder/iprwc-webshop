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

    public Collection<Order> getMyOrders(User authenticator) {
        return dao.getMyOrders(authenticator);
    }

    public void delete(int orderNr, User authenticator) {
        // Controleren of deze bestelling bestaat
        Order order = dao.get(orderNr);

        if (order != null) {
            dao.delete(orderNr);
        }
    }

    public void add(Product[] products, int userId) {
        dao.add(products, userId);
    }

}
