import { connect } from "mongoose";

export default async function createDbConnection(str: string) {
  return connect(str, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }).catch((err) => {
    setTimeout(createDbConnection, 1000);
  });
}
