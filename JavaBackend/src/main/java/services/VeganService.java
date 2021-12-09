package services;


import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Connection;


import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import com.google.appengine.api.utils.SystemProperty;
import java.sql.Statement;

import conn.Connections;
import data.Products;
import data.Suggestions;
@Path("/veganservice")


public class VeganService {
	/*
	 * This method reveives values breed and weight from an html form which sends a POST type request.
	 */
		@POST
		@Produces(MediaType.APPLICATION_JSON)//Method returns object as a JSON string
		@Consumes("application/x-www-form-urlencoded") //Method can receive POSTed data from a html form
		@Path("/addproduct")
		public Response addProductForm(@FormParam("title") String title, @FormParam("brand") String brand, @FormParam("category") String category,
				@FormParam("description") String description, @FormParam("photo") String photo, @FormParam("stores") String stores,
				@FormParam("categoryId") String categoryId, @FormParam("sugg") int sugg
		) throws URISyntaxException {
			Products product=new Products();
			product.setTitle(title);
			product.setBrand(brand);
			product.setCategory(category);
			product.setDescription(description);
			product.setPhoto(photo);
			product.setStores(stores);
			product.setCategoryId(categoryId);
			product.setSugg(sugg);
			String sql="insert into products(title, brand, category, description, photo, stores, categoryId, suggestID) values(?,?,?, ?, ?, ?, ?,?)";
			
			Connection conn=null;
			try {
			    if (SystemProperty.environment.value() ==SystemProperty.Environment.Value.Production) {  
			    	conn = Connections.getProductionConnection();
			    }
			    else {
			    	conn = Connections.getDevConnection();
			    }
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			PreparedStatement pstmt;
			try {
				pstmt = conn.prepareStatement(sql);
				pstmt.setString(1, title);
				pstmt.setString(2, brand);
				pstmt.setString(3, category);
				pstmt.setString(4, description);
				pstmt.setString(5, photo);
				pstmt.setString(6, stores);
				pstmt.setString(7, categoryId);
				pstmt.setInt(8, sugg);
			
				pstmt.execute();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if (conn!=null) {
				try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
//					e.printStackTrace();
				}
			}
			
			URI uri = new URI("/GetData");
			return Response.seeOther(uri).build();
		}
		
		@POST
		@Produces(MediaType.APPLICATION_JSON)//Method returns object as a JSON string
		@Consumes(MediaType.APPLICATION_JSON)//Method receives object as a JSON string
		@Path("/addSugg")
		public Suggestions receiveJsonSuggestion(Suggestions sugg) {
			String sql="insert into Suggestions(title, description, authorID) values(?,?,?)";
			
			Connection conn=null;
			try {
			    if (SystemProperty.environment.value() ==SystemProperty.Environment.Value.Production) {  
			    	conn = Connections.getProductionConnection();
			    }
			    else {
			    	conn = Connections.getDevConnection();
			    }
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			PreparedStatement pstmt;
			try {
				pstmt = conn.prepareStatement(sql);
				pstmt.setString(1, sugg.getTitle());
				pstmt.setString(2,  sugg.getDescription());
				pstmt.setString(3,  sugg.getAuthorID());
				pstmt.execute();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if (conn!=null) {
				try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
//					e.printStackTrace();
				}
			}
			
		
			return sugg;
		}
		
		@GET
		@Produces(MediaType.APPLICATION_JSON)//Method returns object as a JSON string
		@Path("/getSugg")
		public ArrayList<Suggestions> getAllSuggestions() {
			String sql="select * from Suggestions";
			ResultSet RS=null;
			ArrayList<Suggestions> list=new ArrayList<>();
			Connection conn=null;
			try {
			    if (SystemProperty.environment.value() ==SystemProperty.Environment.Value.Production) {  
			    	conn = Connections.getProductionConnection();
			    }
			    else {
			    	conn = Connections.getDevConnection();
			    }
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			Statement stmt;
			try {
				stmt = conn.createStatement();
				RS=stmt.executeQuery(sql);
				while (RS.next()) {
					Suggestions p=new Suggestions();
					p.setId(RS.getInt("suggestionID"));
					p.setTitle(RS.getString("title"));
					p.setDescription(RS.getString("description"));
					p.setAuthorID(RS.getString("authorID"));
		
					
					
					list.add(p);
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if (conn!=null) {
				try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
//					e.printStackTrace();
				}
			}
			return list;
		}



		@GET
		@Produces(MediaType.APPLICATION_JSON)//Method returns object as a JSON string
//		@Consumes(MediaType.APPLICATION_JSON)//Method receives object as a JSON string
		@Path("/deleteProduct/{p1}")
		public Products deleteProduct(@PathParam("p1") int id) {
			String sql="delete from products where id=?";
			
			Connection conn=null;
			try {
			    if (SystemProperty.environment.value() ==SystemProperty.Environment.Value.Production) {  
			    	conn = Connections.getProductionConnection();
			    }
			    else {
			    	conn = Connections.getDevConnection();
			    }
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			PreparedStatement pstmt;
			try {
				pstmt = conn.prepareStatement(sql);
				pstmt.setInt(1, id);
				pstmt.execute();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			Products f=new Products();
			f.setId(100);
			f.setTitle("Title here");
			if (conn!=null) {
				try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
//					e.printStackTrace();
				}
			}
			
			return f;
		}
		
		@POST
		
		@Produces(MediaType.APPLICATION_JSON)//Method returns object as a JSON string
		@Consumes("application/x-www-form-urlencoded") //Method can receive POSTed data from a html form
		@Path("/update/{p1}")
		public Response updateForm(@PathParam("p1") int id, @FormParam("title") String title, @FormParam("brand") String brand, @FormParam("category") String category,
				@FormParam("description") String description, @FormParam("photo") String photo, @FormParam("stores") String stores,
				@FormParam("categoryId") String categoryId, @FormParam("sugg") int sugg
		) throws URISyntaxException {
			Products product=new Products();
			product.setTitle(title);
			product.setBrand(brand);
			product.setCategory(category);
			product.setDescription(description);
			product.setPhoto(photo);
			product.setStores(stores);
			product.setCategoryId(categoryId);
			product.setSugg(sugg);
			String sql="update products "
					+ "set title = ?,"
					+ "brand =?,"
					+ "category =?,"
					+ "description=?,"
					+ "photo=?,"
					+ "stores=?,"
					+ "categoryId=?"
					+ "where id = ?";
			
			Connection conn=null;
			try {
			    if (SystemProperty.environment.value() ==SystemProperty.Environment.Value.Production) {  
			    	conn = Connections.getProductionConnection();
			    }
			    else {
			    	conn = Connections.getDevConnection();
			    }
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			PreparedStatement pstmt;
			try {
				pstmt = conn.prepareStatement(sql);
				pstmt.setString(1, title);
				pstmt.setString(2, brand);
				pstmt.setString(3, category);
				pstmt.setString(4, description);
				pstmt.setString(5, photo);
				pstmt.setString(6, stores);
				pstmt.setString(7, categoryId);
				pstmt.setInt(8, id);
				
			
				pstmt.execute();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if (conn!=null) {
				try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
//					e.printStackTrace();
				}
			}
			
			URI uri = new URI("/GetData");
					return Response.seeOther(uri).build();
			
			
		}
		@GET
		@Produces(MediaType.APPLICATION_JSON)//Method returns object as a JSON string
		@Path("/getAll")
		public ArrayList<Products> getAllProducts() {
			String sql="select * from products";
			ResultSet RS=null;
			ArrayList<Products> list=new ArrayList<>();
			Connection conn=null;
			try {
			    if (SystemProperty.environment.value() ==SystemProperty.Environment.Value.Production) {  
			    	conn = Connections.getProductionConnection();
			    }
			    else {
			    	conn = Connections.getDevConnection();
			    }
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			Statement stmt;
			try {
				stmt = conn.createStatement();
				RS=stmt.executeQuery(sql);
				while (RS.next()) {
					Products p=new Products();
					p.setId(RS.getInt("id"));
					p.setTitle(RS.getString("title"));
					p.setBrand(RS.getString("brand"));
					p.setCategory(RS.getString("category"));
					p.setDescription(RS.getString("description"));
					p.setPhoto(RS.getString("photo"));
					p.setStores(RS.getString("stores"));
					p.setCategoryId(RS.getString("categoryId"));
					p.setSugg(RS.getInt("suggestID"));
					
					
					list.add(p);
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if (conn!=null) {
				try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
//					e.printStackTrace();
				}
			}
			return list;
		}
}