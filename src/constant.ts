const constants = {
  API: {
    PREFIX: "/api/v1",
  },
  VEHICLE:{
    THREEWHEEl:'three wheel',
    BIKE:'bike',
    CAR:'car',
    VAN:'van',
    BUS:'bus',
    LORRY:'lorry',
    TRUCK:'truck'
  },

  USER: {
    ROLES: {
      ADMIN: "admin",
      USER: "user",
    },
  },

  WELLKNOWNSTATUS: {
    ACTIVE: 1,
    DISABLED: 0,
    PENDING: 2,
    APPROVE: 3,
    REJECT: 4,
    DELETED: 5,
  },

  CLOUDINARY: {
    FILE_NAME: "Dev_Link",
  },

  CATEGORYTYPES: {
    NEWS: "news",
    JOB: "job",
    CERTIFICATE: "certificate",
    SERVICETYPE: "serviceType",
  },
};

export default constants;