package vegancos;

import java.io.IOException;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collections;

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
    name = "Suggestions",
    urlPatterns = {"/GetSuggestions"}
)
public class GetSuggestions extends HttpServlet {

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
	    
	   
	    
	    
	    
	    ArrayList<Suggestions> sugglist=new ArrayList<>();
	 
	

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
				ResultSet RS=stmt.executeQuery("select * from Suggestions");
				
				while (RS.next()) {
					Suggestions p=new Suggestions();
					p.setId(RS.getInt("suggestionID"));
					p.setTitle(RS.getString("title"));
					p.setDescription(RS.getString("description"));
					
					
					sugglist.add(p);
					
					
				}
				
				Collections.reverse(sugglist);

			
			request.setAttribute("suggs", sugglist);
			RequestDispatcher rd= request.getRequestDispatcher("Suggestions.jsp");
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