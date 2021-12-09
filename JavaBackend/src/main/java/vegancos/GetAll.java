package vegancos;

import java.io.IOException;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.utils.SystemProperty;

import conn.Connections;
import data.Products;
import data.Suggestions;

@WebServlet(
    name = "GetAll",
    urlPatterns = {"/GetData"}
)
public class GetAll extends HttpServlet {

  /**
	 * 
	 */
	private static final long serialVersionUID = 1L;


  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) 
      throws IOException, ServletException {
	    response.setContentType("text/html");
	    response.setCharacterEncoding("UTF-8");
	    PrintWriter out=response.getWriter();
	    
	   
	    
	    
	    
	    ArrayList<Products> productslist=new ArrayList<>();
	 
	
	
	    Connection conn=null;
	    if (SystemProperty.environment.value() ==SystemProperty.Environment.Value.Production) {  
	    	out.println("Production version");
	    	try {
				conn=Connections.getProductionConnection();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	    }
	    else {    
	    	out.println("Development version");
			try {
				conn=Connections.getDevConnection();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	    }
	    try {
	    	if (conn!=null) {
				Statement stmt=conn.createStatement();
				ResultSet RS=stmt.executeQuery("select * from products");
				
				while (RS.next()) {
					Products p=new Products();
					p.setId(RS.getInt("id"));
					p.setTitle(RS.getString("title"));
					p.setBrand(RS.getString("brand"));
					p.setCategory(RS.getString("category"));
					p.setDescription(RS.getString("description"));
					p.setPhoto(RS.getString("photo"));
					p.setStores(RS.getString("stores"));
					p.setSugg(RS.getInt("suggestID"));
					p.setCategoryId(RS.getString("categoryId"));
					
					
					productslist.add(p);
					
					
				}
				List<Products> shampoos= productslist.stream().filter(product -> product.getCategoryId().contains("c1")).collect(Collectors.toList());
				List<Products> conditioner= productslist.stream().filter(product -> product.getCategoryId().contains("c2")).collect(Collectors.toList());
				List<Products> body= productslist.stream().filter(product -> product.getCategoryId().contains("c3")).collect(Collectors.toList());
				List<Products> face= productslist.stream().filter(product -> product.getCategoryId().contains("c4")).collect(Collectors.toList());
				List<Products> deo= productslist.stream().filter(product -> product.getCategoryId().contains("c5")).collect(Collectors.toList());
				List<Products> clean= productslist.stream().filter(product -> product.getCategoryId().contains("c6")).collect(Collectors.toList());
				List<Products> laundry= productslist.stream().filter(product -> product.getCategoryId().contains("c7")).collect(Collectors.toList());
				List<Products> oral= productslist.stream().filter(product -> product.getCategoryId().contains("c8")).collect(Collectors.toList());
				List<Products> hair= productslist.stream().filter(product -> product.getCategoryId().contains("c10")).collect(Collectors.toList());

					
				
				request.setAttribute("shampoos", shampoos);
				request.setAttribute("conditioner", conditioner);
				request.setAttribute("body", body);
				request.setAttribute("face", face);
				request.setAttribute("deo", deo);
				request.setAttribute("clean", clean);
				request.setAttribute("laundry", laundry);
				request.setAttribute("oral", oral);
				request.setAttribute("hair", hair);
			
				RequestDispatcher rd= request.getRequestDispatcher("products.jsp");
				rd.forward(request, response);
	    	}
	    	
	    
	    	else {
	    		out.println("No connection to database!");
	    	}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
  }
}