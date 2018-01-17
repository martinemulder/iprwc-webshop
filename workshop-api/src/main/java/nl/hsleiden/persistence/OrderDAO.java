package nl.hsleiden.persistence;

import com.mysql.jdbc.ResultSetImpl;
import nl.hsleiden.model.Order;
import nl.hsleiden.model.Product;
import nl.hsleiden.model.User;

import javax.inject.Singleton;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Singleton
public class OrderDAO {

    private Database database = Database.getDatabase();
    private ProductDAO productDAO;
    private UserDAO userDAO;
    private Connection dbConnection;
    private List<Order> orders;
    private List<Product> products;
    private PreparedStatement getOrders;
    private PreparedStatement getMyOrders;
    private PreparedStatement getOrder;
    private PreparedStatement getOrderProducts;
    private PreparedStatement deleteOrder;
    private PreparedStatement deleteOrderProducts;
    private PreparedStatement addOrder;
    private PreparedStatement addProductOrder;

    public OrderDAO() {

        this.productDAO = new ProductDAO();
        this.userDAO = new UserDAO();
        dbConnection = database.getDbConnection();
        preparedStatements();

    }

    public List<Order> getMyOrders(User authenticator) {

        User user = userDAO.getByEmailAddress(authenticator.getEmailAddress());
        ResultSet resultSet;
        try {
            orders = new ArrayList<Order>();
            getMyOrders.setInt(1, user.getId());
            resultSet = getMyOrders.executeQuery();

            while (resultSet.next()) {
                Order order = new Order(
                        resultSet.getInt("id"),
                        resultSet.getInt("user_id"),
                        resultSet.getString("date_time")
                );
                orders.add(order);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
        return orders;
    }
    
    public List<Order> getAll() {
        ResultSet resultSet;
        try {
            orders = new ArrayList<Order>();
            resultSet = getOrders.executeQuery();

            while (resultSet.next()) {
                Order order = new Order(
                        resultSet.getInt("id"),
                        resultSet.getInt("user_id"),
                        resultSet.getString("date_time")
                );
                orders.add(order);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
        return orders;
    }

    public Order get(int orderId) {
        Order order = null;
        try {
            getOrder.setInt(1,orderId);
            ResultSet resultSet = getOrder.executeQuery();

            while (resultSet.next()) {
                order = new Order(resultSet.getInt(1),
                    resultSet.getInt(2),
                            resultSet.getString(3));
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
        return order;
    }

    public List<Product> getOrderProducts(int orderId) {
        try {
            products = new ArrayList<Product>();
            getOrderProducts.setInt(1,orderId);
            ResultSet resultSet = getOrderProducts.executeQuery();

            while (resultSet.next()) {
                Product product = new Product(
                        resultSet.getInt("id"),
                        resultSet.getInt("barcode"),
                        resultSet.getString("artist"),
                        resultSet.getString("title"),
                        resultSet.getInt("year"),
                        resultSet.getInt("price"),
                        resultSet.getInt("quantity")
                );
                products.add(product);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
        return products;
    }

    public Boolean add(Product[] products, int userId) {
        try {
            addOrder.setInt(1,userId);
            addOrder.executeUpdate();
            long orderId;

            try (ResultSet generatedKeys = addOrder.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    orderId = generatedKeys.getLong(1);
                }
                else {
                    throw new SQLException("Creating order failed, no ID obtained.");
                }
            }

            for (Product product : products) {

                Product tempProduct = productDAO.getByBarcode(product.barcode);
                if (tempProduct != null) {
                    int productId = tempProduct.getId();

                    addProductOrder.setInt(1,productId);
                    addProductOrder.setLong(2,orderId);
                    addProductOrder.setInt(3,product.getQuantity());
                    addProductOrder.executeUpdate();
                }
            }
            return true;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public Boolean delete(int orderId) {
        try {
            deleteOrder.setInt(1,orderId);
            deleteOrder.executeUpdate();
            deleteOrderProducts.setInt(1,orderId);
            deleteOrderProducts.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    private void preparedStatements() {
        try {
            getOrder = dbConnection.prepareStatement("SELECT * FROM purchase_order WHERE id = ?;");
            getOrders = dbConnection.prepareStatement("SELECT * FROM purchase_order;");
            getMyOrders = dbConnection.prepareStatement("SELECT * FROM purchase_order WHERE user_id = ?;");
            getOrderProducts = dbConnection.prepareStatement("SELECT p.*, pp.quantity FROM product p JOIN purchase_product pp ON pp.product_id = p.id WHERE order_id = ?");
            deleteOrder = dbConnection.prepareStatement("DELETE FROM purchase_order WHERE id = ?;");
            deleteOrderProducts = dbConnection.prepareStatement("DELETE FROM purchase_product WHERE order_id = ?;");
            addOrder = dbConnection.prepareStatement("INSERT INTO purchase_order (user_id) VALUES (?);");
            addProductOrder = dbConnection.prepareStatement("INSERT INTO purchase_product (product_id, order_id, quantity) VALUES (?,?,?);");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
