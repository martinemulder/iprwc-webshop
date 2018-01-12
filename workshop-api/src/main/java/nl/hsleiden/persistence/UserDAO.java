package nl.hsleiden.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.inject.Singleton;

import nl.hsleiden.model.Product;
import nl.hsleiden.model.User;


@Singleton
public class UserDAO {

    private Database database = Database.getDatabase();
    private PreparedStatement getProducts;
    private Connection dbConnection;
    private List<User> users;
    private PreparedStatement getUsers;
    private PreparedStatement addUser;
    private PreparedStatement deleteUser;
    
    public UserDAO() {

        dbConnection = database.getDbConnection();
        preparedStatements();

    }
    
    public List<User> getAll() {
        try {
            users = new ArrayList<User>();
            ResultSet resultSet = getUsers.executeQuery();

            while (resultSet.next()) {
                User user = new User(
                        resultSet.getInt("id"),
                        resultSet.getString("fullname"),
                        resultSet.getString("postcode"),
                        resultSet.getString("streetnumber"),
                        resultSet.getString("email"),
                        resultSet.getString("password"),
                        resultSet.getString("role")
                );
                users.add(user);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
        return users;
    }
    
    public User get(int id) {
        try {
            return users.get(id);
        } catch(IndexOutOfBoundsException exception) {
            return null;
        }
    }
    
    public User getByEmailAddress(String emailAddress) {
        users = getAll();
        Optional<User> result = users.stream()
            .filter(user -> user.getEmailAddress().equals(emailAddress))
            .findAny();
        
        return result.isPresent() ? result.get() : null;
    }
    
    public void add(User user) {
        try {
            addUser.setString(1,user.getFullName());
            addUser.setString(2,user.getPostcode());
            addUser.setString(3,user.getStreetnumber());
            addUser.setString(4,user.getEmailAddress());
            addUser.setString(5,user.getPassword());
            addUser.setString(6,user.getRole());
            addUser.execute();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
    public void update(int id, User user) {
        users.set(id, user);
    }
    
    public void delete(int id) {
        System.out.println("Deleting user in DAO");
        try {
            deleteUser.setInt(1,id);
            deleteUser.execute();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void preparedStatements() {
        try {
            getUsers = dbConnection.prepareStatement("SELECT * from user;");
            addUser = dbConnection.prepareStatement("INSERT INTO user(fullname, postcode, streetnumber, email, password, role) VALUES (?,?,?,?,?,?)");
            deleteUser = dbConnection.prepareStatement("DELETE FROM user WHERE id = ?");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
