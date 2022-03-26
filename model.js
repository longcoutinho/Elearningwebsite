const PersonModel = Mongoose.model("movies", {
    firstname: String,
    lastname: String
});

export default PersonModel;