<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
  <head>
    <meta http-equiv="content-type" content="application/xhtml+xml; charset=UTF-8" />
    <title>Update products</title>
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
  </head>

  <body>
  
<div class="center">
    <h2>Update product  <%= request.getParameter("title") %></h2>
      ID:  <%= request.getParameter("id") %> <br>
  Title:  <%= request.getParameter("title") %> <br>
   Brand:  <%= request.getParameter("brand") %> <br>
    Description <%= request.getParameter("description") %><br>
   Stores   <%= request.getParameter("stores") %><br>
    Photo   <%= request.getParameter("photo") %><br>
    Category    <%= request.getParameter("category") %><br>




	<form action='./rest/veganservice/update/<%= request.getParameter("id") %>' method='post'>
	
	<div class="form-group">
	<label for="title"> Title</label>
	 <input type='text' name='title' value=''id="title" class="form-control"><br>
	</div>
	<div class="form-group">
	<label for="brand"> Brand</label>
 <input type='text' name='brand' value='' id="brand" class="form-control"><br>
 </div>

	  <label for="category">Choose a category:</label>
  <select name="category" id="category">
    <option value="Hair" id="Hair">Hair</option>
    <option value="Face" id="Face">Face</option>
    <option value="Body" id="Body">Body</option>
    <option value="Deodorant" id="Deodorant">Deodorant</option>
    <option value="Laundry" id="Laundry">Laundry</option>
    <option value="Cleaning" id="Cleaning">Cleaning Products</option>
        <option value="oralhygiene" id="OralHygiene">Oral Hygiene</option>
  </select>
  <br>
   <div class="form-group">
	<label for="description"> Description</label>
	 <input type='text' name='description' value='' id="description" class="form-control"><br>
	
	</div>
	<div class="form-group">
	<label for="photo"> Photo</label>
	
	<input type='text' name='photo' value='' id="photo" class="form-control"><br>
	</div>
	<div class="form-group">
	<label for="stores">Stores</label>
	<input type='text' name='stores' value='' id="stores" class="form-control"><br>
	</div>
	<div class="form-grpup">
	<label for="categoryId">CatId</label>
	<input type='text' name='categoryId' value='' id="categoryId" class="form-control"><br>
	</div>
	
	<input type='submit' name='ok' value='OK'onclick="return confirm('Are you sure?')" ><br>
	</form>

</div>

  </body>
</html>