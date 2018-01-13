package nl.hsleiden.service;

import nl.hsleiden.model.Product;
import nl.hsleiden.model.User;
import nl.hsleiden.persistence.ProductDAO;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.Collection;


@Singleton
public class ProductService extends BaseService<User> {

    private final ProductDAO dao;

    @Inject
    public ProductService(ProductDAO dao) {
        this.dao = dao;
    }
    
    public Collection<Product> getAll() {
        return dao.getAll();
    }
    
    public Product get(int id) {
        return dao.get(id);
    }
    
    public void add(Product product, User authenticator) {
        // Check if barcode is not equal to existing product
        Product oldProduct = dao.getByBarcode(product.getBarcode());

        if (oldProduct == null) {
            if (authenticator.hasRole("ADMIN")) {
                // Check if user has role admin
                dao.add(product);
            }
        }
    }
    
    public void update(Product product, User authenticator) {
        // Check if this product exists
        Product oldProduct = dao.getByBarcode(product.getBarcode());

        if (oldProduct != null) {

            if (authenticator.hasRole("ADMIN")) {
                // Check if user has role admin
                dao.update(oldProduct.getId(), product);
            }
        }
    }
    
    public void delete(int barcode, User authenticator) {
        System.out.println(barcode);
        Product targetProduct = dao.getByBarcode(barcode);

        if (targetProduct != null) {

            if (authenticator.hasRole("ADMIN")) {
                dao.delete(targetProduct.getId());
            }
        }
        
    }

}
