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
    private PreparedStatement getUser;
    private PreparedStatement getUsers;
    private PreparedStatement addUser;
    private PreparedStatement editUser;
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
        User user = new User();
//        users = getAll();
//
//        Optional<User> result = users.stream()
//                .filter(user -> user.getId() == id)
//                .findAny();
//
//        return result.isPresent() ? result.get() : null;

        try {
            getUser.setInt(1,id);
            ResultSet resultSet = getUser.executeQuery();

            while (resultSet.next()) {
                user = new User(resultSet.getInt(1),
                        resultSet.getString(2),
                        resultSet.getString(3),
                        resultSet.getString(4),
                        resultSet.getString(5),
                        resultSet.getString(6),
                        resultSet.getString(7)
                );
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
        return user;
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
        try {
            editUser.setString(1,user.getFullName());
            editUser.setString(2,user.getPostcode());
            editUser.setString(3,user.getStreetnumber());
            editUser.setString(4,user.getEmailAddress());
            editUser.setString(5,user.getPassword());
            editUser.setInt(6,id);
            editUser.execute();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
    public void delete(int id) {
        try {
            deleteUser.setInt(1,id);
            deleteUser.execute();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void preparedStatements() {
        try {
            getUser = dbConnection.prepareStatement("SELECT * FROM user WHERE id = ?");
            getUsers = dbConnection.prepareStatement("SELECT * from user;");
            addUser = dbConnection.prepareStatement("INSERT INTO user(fullname, postcode, streetnumber, email, password, role) VALUES (?,?,?,?,?,?)");
            editUser = dbConnection.prepareStatement("UPDATE user SET fullname = ?, postcode = ?, streetnumber = ?, email = ?, password = ? WHERE id = ?");
            deleteUser = dbConnection.prepareStatement("DELETE FROM user WHERE id = ?");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
