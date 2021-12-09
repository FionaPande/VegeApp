package data;

public class Products {
	
	private int id;
	private String title;
	private String brand;
	private String category;
	private String description;
	private String photo;
	private String stores;
	private String categoryId;
	private int sugg;
	
	

	
	public int getSugg() {
		return sugg;
	}
	public void setSugg(int sugg) {
		this.sugg = sugg;
	}
	public String getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public String getStores() {
		return stores;
	}
	public void setStores(String stores) {
		this.stores = stores;
	}
	
	public String toString() {
		return id+" "+title+" "+brand+" "+category+" "+description+" "+photo+" " +stores+" "+categoryId;
	}

}
