import mongoose from "mongoose";

// Schema för arbetserfarenheter (lagrar tidigare jobb och relaterad info)
const WorkExperienceSchema = new mongoose.Schema(
  {
    //Företagsnamn (obligatoriskt)
    company: { type: String, required: true, trim: true },
    //Jobbtitel/roll (obligatoriskt)
    title: { type: String, required: true, trim: true },
    //Startdatum för anställning (obligatoriskt)
    startDate: { type: Date, required: true },
    //Slutdatum (valfritt)
    endDate: { type: Date },
    // Kort beskrivning av arbetsuppgifter (obligatoriskt)
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    //Plats (valfritt)
    location: { type: String, trim: true },
  },
  // skapar fälten createdAt och updatedAt automatiskt
  { timestamps: true }
);

// kontrollera att slutdatum inte är före startdatum innan det sparas i databasen
WorkExperienceSchema.pre("save", function (next) {
  if (this.endDate && this.startDate && this.endDate < this.startDate) {
    return next(new Error("endDate kan inte vara före startDate"));
  }
  next();
});

export default mongoose.model("WorkExperience", WorkExperienceSchema);
