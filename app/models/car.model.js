module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        make: String,
        year: String,
        color: String,
        price: String,
        available: Boolean
      },
      { timestamps: true }
  );

  schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Car = mongoose.model("car", schema);

  return Car;
};