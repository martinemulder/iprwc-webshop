package nl.hsleiden.model;

import com.fasterxml.jackson.annotation.JsonView;
import nl.hsleiden.View;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

import java.security.Principal;

public class Order implements Principal {

    @NotEmpty
    @Length(min = 1, max = 10)
    @JsonView(View.Public.class)
    private int orderNr;

    @NotEmpty
    @Length(min = 1, max = 10)
    @JsonView(View.Private.class)
    private int userId;
    
    @NotEmpty
    @Length(min = 8, max = 30)
    @JsonView(View.Public.class)
    private String datetime;

    public Order(int orderNr,int userId, String datetime) {

        this.orderNr = orderNr;
        this.userId = userId;
        this.datetime = datetime;

    }

    public int getOrderNr() {
        return orderNr;
    }

    public void setOrderNr(int orderNr) {
        this.orderNr = orderNr;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getDatetime() {
        return datetime;
    }

    public void setDatetime(String datetime) {
        this.datetime = datetime;
    }

    @Override
    public String getName() {
        return null;
    }

}
