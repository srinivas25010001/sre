
let resNotFound = (res, errMsg) => {
  return res.status(203).send({ statusCode: "203", statusMessage: "Not Found!!", error: errMsg });
};
let resServerError = (res, error) => {
  console.error(error);
   
  if (error?.errors) {
    if (error.errors[0].validatorKey === "not_unique") {
      let errMsg = String(error.errors[0].message);
      return res.status(203).send({ statusCode: "203", statusMessage: errMsg.replace("_u1", ""), error: [] });
    } else {
      return res.status(500).send({ statusCode: "500", statusMessage: "Server Error!!", error: error });
    }
  } else if (error?.parent?.code === "ER_DATA_TOO_LONG") {
    return res.status(203).send({ statusCode: "203", statusMessage: "Data too long.", error: [] });
  } else {
    return res.status(500).send({ statusCode: "500", statusMessage: "Server Error!!", error: error });
  }
};
let resDocCreated = (res, doc) => {
  return res.status(200).send({ statusCode: "200", statusMessage: "Document created successfully", data: doc });
};
let resDocUpdated = (res, doc) => {
  return res.status(200).send({ statusCode: "200", statusMessage: "Document updated successfully", data: doc });
};
let resReqProcessed = (res, inMessage,doc) => {
  let msg = (inMessage !== null && inMessage !== undefined && inMessage !== "") ? inMessage : "Request Processed Successfully";
  return res.status(200).send({ statusCode: "200", statusMessage: msg, data: doc });
};
let resErrorOccured = (res, err) => {
  let er = err !== null && err !== undefined && err !== "" ? err : "Error Occured";
  return res.status(203).send({ statusCode: "203", statusMessage: er, error: er });
};
let resAlreadyExists = (res, doc) => {
  return res.status(203).send({ statusCode: "203", statusMessage: "Document already exists", data: doc });
};

let resFound = (res, doc) => {
  return res.status(200).send({ statusCode: "200", statusMessage: "Document Found", data: doc });
};

let resDocDeleted = (res, doc) => {
  return res.status(200).send({ statusCode: "200", statusMessage: "Document successfully deleted ", data: doc });
};

let resDocCancelled = (res, doc) => {
  return res.status(200).send({ statusCode: "200", statusMessage: "Document Cancelled successfully ", data: doc });
};

let resPaginationDoc = (res, doc, paginate) => {
  return res.status(200).send({ statusCode: "200", statusMessage: "Document Found", data: doc, paginate });
};

let resMobileApi = (res, objName, docName, doc) => {
  let resBody = {
    SiebelMessage: {
      IntObjectFormat: "Siebel Hierarchical",
      MessageId: "1-HBGD",
      IntObjectName: objName,
      MessageType: "Integration Object",
      [docName]: doc,
    },
  };
  return res.status(200).send(resBody);
};

module.exports = {
  resNotFound,
  resServerError,
  resDocCreated,
  resDocUpdated,
  resAlreadyExists,
  resErrorOccured,
  resFound,
  resDocDeleted,
  resDocCancelled,
  resPaginationDoc,
  resMobileApi,
  resReqProcessed
};
