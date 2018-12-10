import firebase from "firebase";
import router from "../../routes/index";

const actions = {
  deletePlaceAndDoctorData({ commit }, payload) {
    const { reference, placeId } = payload;
    commit("switchLoading", true, { root: true });
    const titles = [];
    firebase
      .database()
      .ref(`/${reference}Information/${placeId}/imageTitles`)
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          titles.push(childSnapshot.val());
        });
        return true;
      })
      .then(() => {
        firebase
          .database()
          .ref(`/${reference}Information/${placeId}`)
          .remove();
        firebase
          .database()
          .ref(`/doctors/${placeId}`)
          .remove();
        return true;
      })
      .then(() => {
        for (const item of titles) {
          firebase
            .storage()
            .ref()
            .child(`${reference}/${placeId}/${item}`)
            .delete()
            .catch(error => console.log(error));
        }
        return true;
      })
      .then(() => {
        router.push(`/home/data/${reference}`);
        commit("switchLoading", false, { root: true });
      })
      .catch(error => console.log(error));
  }
};

export default {
  namespaced: true,
  actions
};
