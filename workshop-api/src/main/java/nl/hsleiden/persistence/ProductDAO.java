package nl.hsleiden.persistence;

import nl.hsleiden.model.Product;

import javax.inject.Singleton;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Singleton
public class ProductDAO {

    private Database database = Database.getDatabase();
    private PreparedStatement getProducts;
    private PreparedStatement editProduct;
    private PreparedStatement addProduct;
    private PreparedStatement deleteProduct;
    private Connection dbConnection;
    private List<Product> products;

    public ProductDAO() {

        dbConnection = database.getDbConnection();
        preparedStatements();

    }

    public List<Product> getAll() {
        try {
            products = new ArrayList<Product>();
            ResultSet resultSet = getProducts.executeQuery();

            while (resultSet.next()) {
                Product product = new Product(
                        resultSet.getInt("id"),
                        resultSet.getInt("barcode"),
                        resultSet.getString("artist"),
                        resultSet.getString("title"),
                        resultSet.getInt("year"),
                        resultSet.getDouble("price")
                );
                products.add(product);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
        return products;
    }

    public Product getByBarcode(int barcode) {
        products = getAll();
        Optional<Product> result = products.stream()
                .filter(product -> product.getBarcode() == barcode)
                .findFirst();

        return result.isPresent() ? result.get() : null;
    }
    
    public Product get(int id) {
        try {
            return products.get(id);
        } catch(IndexOutOfBoundsException exception) {
            return null;
        }
    }
    
    public void add(Product product) {

        try {
            addProduct.setInt(1, product.getBarcode());
            addProduct.setString(2,product.getArtist());
            addProduct.setString(3,product.getTitle());
            addProduct.setInt(4,product.getYear());
            addProduct.setDouble(5,product.getPrice());
            addProduct.execute();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
    public void update(int id, Product product) {
        try {
            editProduct.setString(1,product.getArtist());
            editProduct.setString(2,product.getTitle());
            editProduct.setInt(3,product.getYear());
            editProduct.setDouble(4,product.getPrice());
            editProduct.setInt(5,id);
            editProduct.execute();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void delete(int id) {
        try {
            deleteProduct.setInt(1,id);
            deleteProduct.execute();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void preparedStatements() {
        try {
            getProducts = dbConnection.prepareStatement("SELECT * from product ORDER BY title");
            deleteProduct = dbConnection.prepareStatement("DELETE FROM product WHERE id = ?");
            editProduct = dbConnection.prepareStatement("UPDATE product SET artist = ?, title = ?, year = ?, price = ? WHERE id = ?");
            addProduct = dbConnection.prepareStatement("INSERT INTO product (barcode, artist, title, year, price) VALUES (?,?,?,?,?)");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
