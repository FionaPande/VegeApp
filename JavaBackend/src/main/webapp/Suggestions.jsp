<%@page import="data.Suggestions"%> 
<%@page import="java.util.ArrayList"%> 
<%@page contentType="text/html" pageEncoding="UTF-8"%> 
<!DOCTYPE html> 
<html> 
  <head> 
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <style>
.center {
  margin: auto;
  width: 50%;
  border: 3px solid #000000;
  padding: 10px;
  background-color: #CCC
}
</style>

   <title>Product List</title> 

  </head> 
  
  <body> 
  <div class="center">
     <h1>Displaying Product List</h1> 
     <a href="/addproducts.html" class="btn btn-default" role="button">Add New</a>
     
     <div id="this"></div>
   
 
    <table class="table table-striped">
    <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>ID</th>
      </tr>
    </thead>
        <%-- Fetching the attributes of the request object 
             which was previously set by the servlet  
              "StudentServlet.java" 
        --%>  
        <%ArrayList<Suggestions> std =  
            (ArrayList<Suggestions>)request.getAttribute("suggs"); 
        for(Suggestions s:std){%> 
        <%-- Arranging data in tabular form 
        --%> 
            <tbody> 
            <tr>
                <td><%=s.getTitle()%></td> 
                <td><%=s.getDescription()%></td> 
                   <td><%=s.getId()%></td> 
                   
                
            

     </tr>
			</tbody>		
                
           
            <%}%> 
        </table>  
        <hr/> 

  
  <br>
  
   
 
  
     </div>
    </body> 
</html> 