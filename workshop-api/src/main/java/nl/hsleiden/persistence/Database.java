package nl.hsleiden.persistence;

import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public class Database {

    private Connection dbConnection;
    private static Database database;

    /**
     * This is the constructor for the Database. It
     * loads the database driver.
     */
    private Database() {

        // Load dbms driver
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e){
            e.printStackTrace();
        }

        try {
//            String url ="jdbc:mysql://bramvoc263.263.axc.nl:3306/bramvoc263_see";
            String url ="jdbc:mysql://localhost/webshop";
//            dbConnection = DriverManager.getConnection(url, "bramvoc263_see","m.n.mulder");
            dbConnection = DriverManager.getConnection(url, "root","");

            if (dbConnection == null) {
                System.out.println("Connection lost");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    /**
     * @return the Database
     */
    public static Database getDatabase() {
        if (database == null) {
            database = new Database();
        }
        return database;
    }

    /**
     * @return the database connection
     */
    public Connection getDbConnection() {
        return dbConnection;
    }

}
