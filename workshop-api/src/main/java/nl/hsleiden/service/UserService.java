package nl.hsleiden.service;

import java.util.Collection;
import javax.inject.Inject;
import javax.inject.Singleton;
import nl.hsleiden.model.User;
import nl.hsleiden.persistence.UserDAO;


@Singleton
public class UserService extends BaseService<User> {

    private final UserDAO dao;
    
    @Inject
    public UserService(UserDAO dao) {
        this.dao = dao;
    }
    
    public Collection<User> getAll() {
        return dao.getAll();
    }
    
    public User get(int id) {
        return requireResult(dao.get(id));
    }
    
    public void add(User user) {
        user.setRole("GUEST");
        dao.add(user);
    }
    
    public void update(User authenticator, int id, User user) {
        // Check if this user exists
        User oldUser = get(id);
        
        if (!authenticator.hasRole("ADMIN")) {
            // Check if user is updating itself
            assertSelf(authenticator, oldUser);
        }
        
        dao.update(id, user);
    }
    
    public void delete(String email, User authenticator) {
        // Check if this user exists


        User user = dao.getByEmailAddress(email);
        System.out.println("User email -> " + user.getEmailAddress());


        if (user != null) {

//            if (!authenticator.hasRole("ADMIN")) {
//                // Check if user is deleting itself
//                assertSelf(authenticator, user);
//            }
            dao.delete(user.getId());
        }



    }

}
