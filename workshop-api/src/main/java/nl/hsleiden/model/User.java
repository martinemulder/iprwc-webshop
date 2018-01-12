package nl.hsleiden.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import java.security.Principal;
import nl.hsleiden.View;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;


public class User implements Principal {

    @NotEmpty
    @Length(min = 1, max = 8)
    @JsonView(View.Private.class)
    private int id;

    @NotEmpty
    @Length(min = 3, max = 100)
    @JsonView(View.Public.class)
    private String fullName;
    
    @NotEmpty
    @Length(min = 6, max = 7)
    @JsonView(View.Public.class)
    private String postcode;
    
    @NotEmpty
    @Length(min = 1, max = 10)
    @JsonView(View.Public.class)
    private String streetnumber;
    
    @NotEmpty
    @Email
    @JsonView(View.Public.class)
    private String emailAddress;
    
    @NotEmpty
    @Length(min = 8)
    @JsonView(View.Protected.class)
    private String password;
    
    @JsonView(View.Public.class)
    private String role;

    public User() { }

    public User(int id, String fullName, String postcode, String streetnumber, String emailAddress, String password, String role) {

        this.id = id;
        this.fullName = fullName;
        this.postcode = postcode;
        this.streetnumber = streetnumber;
        this.emailAddress = emailAddress;
        this.password = password;
        this.role = role;

    }

    public User(String fullName, String postcode, String streetnumber, String emailAddress, String password, String role) {

        this.fullName = fullName;
        this.postcode = postcode;
        this.streetnumber = streetnumber;
        this.emailAddress = emailAddress;
        this.password = password;
        this.role = role;

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getStreetnumber() {
        return streetnumber;
    }

    public void setStreetnumber(String streetnumber) {
        this.streetnumber = streetnumber;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    @JsonIgnore
    public String getName() {
        return fullName;
    }
    
    public String getRole() {
        return role;
    }

    public void setRole(String role)
    {
        this.role = role;
    }
    
    public boolean hasRole(String roleName) {
        if (role != null) {
            if (roleName.equals(role)) {
                return true;
            }
        }
        return false;
    }
    
    public boolean equals(User user) {
        return emailAddress.equals(user.getEmailAddress());
    }

}
