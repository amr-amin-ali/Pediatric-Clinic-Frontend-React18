import FileItem from "./components/file-item";
const ViewAllFiles = () => {
  return (
    <div className="col-8">
      <FileItem fileData={{ id: "JGFDKU", firstName: "أنس عمرو المغربى" }} />
      <FileItem fileData={{ id: "SFFS", firstName: "ريهام عمرو" }} />
    </div>
  );
};
export default ViewAllFiles;
