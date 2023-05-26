//import "https://static.stage.vouched.id/widget/vouched-2.0.0.js";

const config = {
  appId: process.env.VOUCHED_API_KEY,

  // your webhook for POST verification processing
  callbackURL: "https://www.vouched.id/",

  // optional verification information for comparison
  verification: {
    firstName: "First",
    lastName: "Last",
    email: "test@test.id",
    phone: "000-111-2222",
  },

  // mobile handoff fields, a job will be created automatically if true
  crossDevice: true,
  crossDeviceQRCode: true,
  crossDeviceSMS: true,

  // have the user confirm information
  userConfirmation: {
    confirmData: true,
    confirmImages: true,
  },

  // callback during initialization of the web app
  onInit: ({ token, job }) => {
    console.log("initialization");
  },

  // callback when a user submits a photo
  onSubmit: ({ stage, attempts, job }) => {
    console.log("photo submitted");
  },

  // called when a job is completed.
  onDone: (job) => {
    // token used to query jobs
    console.log("scanning complete", { token: job.token });

    // An alternative way to update your system based on the
    // results of the job. Your backend could perform the following:
    // 1. query jobs with the token
    // 2. store relevant job information such as the id and
    //    success property into the user's profile
    // fetch(`/yourapi/idv?job_token=${job.token}`);

    // Redirect to the next page based on the job success
    // if (job.result.success) {
    //   window.location.replace("https://www.vouched.id/");
    // } else {
    //   window.location.replace("https://www.vouched.id/");
    // }
  },

  // callback executed after attempt to find camera device
  onCamera: ({ hasCamera, hasPermission }) => {
    console.log("attempted to find camera");
  },

  // callback when there are changes to the Camera DOM element
  onCameraEvent: (cameraEvent) => {
    console.log("camera DOM element updated");
  },

  // callback when a reverification job is complete
  onReverify: (job) => {
    console.log("reverification complete");
  },

  // callback when a survey is submitted, (per customer basis)
  onSurveyDone: (job) => {
    console.log("survey done");
  },

  // callback when user confirms data and photos
  onConfirm: (userConfirmEvent) => {
    console.log("user confirmation");
  },

  // theme
  theme: {
    name: "avant",
    // iconLabelColor: "red",
    // logo: {
    //   src: "https://www.vouched.id/wp-content/uploads/2020/11/vouched_logo_hi_res.png",
    //   style: { "max-width": 150, "margin-bottom": 30 },
    // },
    // iconColor: "#000000",
    // iconBackground: "red",
    // bgColor: "#ececec",
    // navigationActiveText: "yellow",
    // baseColor: "green",
    // font: '"Comic Sans MS", "Comic Sans", cursive',
    // navigationActiveBackground: "red",
    // navigationDisabledBackground: "#777",
    // secondaryButtonColor: "lightblue",
    // handoffLinkColor: "red",
    // progressIndicatorTextColor: "red",
  },
};

const loadVouched = () => {
  const existingScript = document.getElementById("vouched");
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = `https://static.vouched.id/widget/vouched-2.0.0.js`;
    script.id = "vouched";
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
      var vouched = window["Vouched"]({ ...config });
      console.log("mount vouched-element");
      vouched.mount("#vouched-element");
    };
  }
};

export default loadVouched;
