package nl.hsleiden.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import nl.hsleiden.View;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

import java.security.Principal;

public class Product implements Principal {

    @NotEmpty
    @Length(min = 1, max = 8)
    @JsonView(View.Private.class)
    private int id;

    @NotEmpty
    @Length(min = 8, max = 8)
    @JsonView(View.Public.class)
    public int barcode;

    @Length(min = 3, max = 100)
    @JsonView(View.Public.class)
    private String artist;
    
    @NotEmpty
    @Length(min = 3, max = 100)
    @JsonView(View.Public.class)
    private String title;
    
    @NotEmpty
    @Length(min = 1, max = 10)
    @JsonView(View.Public.class)
    private double price;

    @NotEmpty
    @Length(min = 1, max = 10)
    @JsonView(View.Public.class)
    private int year;

    @NotEmpty
    @Length(min = 1, max = 10)
    @JsonView(View.Public.class)
    private int quantity;

    @Override
    @JsonIgnore
    public String getName() {
        return title + artist;
    }

    public Product() {}

    public Product(int id, int barcode, String artist, String title, int year, double price, int quantity) {

        this.id = id;
        this.barcode = barcode;
        this.artist = artist;
        this.title = title;
        this.year = year;
        this.price = price;
        this.quantity = quantity;

    }

    public Product(int id, int barcode, String artist, String title, int year, double price) {

        this.id = id;
        this.barcode = barcode;
        this.artist = artist;
        this.title = title;
        this.year = year;
        this.price = price;

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getBarcode() {
        return barcode;
    }

    public void setBarcode(int barcode) {
        this.barcode = barcode;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

}
