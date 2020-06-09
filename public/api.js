const API = {
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();
    return json[json.length - 1];
  },
  async addExercise(data) {
    // console.log("----------->" + JSON.stringify(data));
    let id = location.search.split("=")[1];
    // if a new workout is being created then it should update the latest id to the newly created workout id
    if (id === undefined) {
      try {
        id = await this.getLastWorkout();
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await fetch("/api/workouts/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      let json = await res.json();
      console.log("----------->" + json);
      json = JSON.stringify(json).replace(/"/g, '').replace(/, /g, '<br /><br />').replace('Validation failed: ', '');

      if (res.status == 422) {
        $(".content p").html(json);
        $('.ui.basic.modal').modal('show');
        // alert(json);
        return false;
      }

      return json;
    }
    catch (error) {
      console.log(error);
      // alert(error);
      return false;
    }
  },
  async createWorkout(data = {}) {
    try {
      const res = await fetch("/api/workouts", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
      const json = await res.json();

      return json;
    }
    catch (error) {
      console.log(error);
      // alert(error);
      return false;
    }
  },
  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};
