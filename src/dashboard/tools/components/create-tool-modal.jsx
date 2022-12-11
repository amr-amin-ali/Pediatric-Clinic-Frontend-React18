import SubmitButton from "../../components/buttons/submit-button";
import ModalHeader from "../../components/bootstrap-modal/modal-header";
import TextInput from "../../components/inputs/text-input";
import { useStore } from "../../../hooks-store/store";
import { useState } from "react";
import { api } from "../../../utility/api";
import { httpPOST } from "../../../http/httpPOST";
import { closeBootstrapModal } from "../../../utility/close-bootstrap-modal";
import DashboardLoader from "../../components/loader/dashboardLoader";

const CreateToolModal = () => {
  const dispatch = useStore()[1];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [toolName, setToolName] = useState("");
  const [error, setError] = useState(null);

  const toolNameChangeHandler = (event) => {
    console.log(event.target.value);

    if (!event.target.value.trim()) {
      setError("أدخل إسم الآداة.");
    } else {
      setError(null);
    }
    setToolName(event.target.value);
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    console.log("submitFormHandler:  Form submitted");

    if (!error && toolName) {
      setIsSubmitting(true);
      httpPOST(api.tools.create_tool, {
        name: toolName,
      })
        .then((response) => {
          if (response.status === 400) {
            response.json().then((result) => alert(Object.values(result)[0]));
            setIsSubmitting(false);
          }
          if (response.status === 401) {
            alert("Please login first");
            dispatch("LOGOUT");
            closeBootstrapModal();
          }

          if (response.status === 201) {
            response.json().then((data) => {
              dispatch("ADD_TOOL_TO_STORE", data);
              setToolName("");
              setIsSubmitting(false);
              closeBootstrapModal();
            });
          }
        })
        .catch((c) => {
          alert("Network error while publishing article!!");
          setIsSubmitting(false);
          closeBootstrapModal();
        });
    }
  };

  return (
    <div>
      <div
        className="modal fade bg-blue-dark"
        data-bs-backdrop="static"
        id="createNewToolModal"
        tabIndex="-1"
        aria-labelledby="createNewToolModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content bg-blue-light">
            <form>
              <ModalHeader title="تسجيل آداة جديدة" />
              {isSubmitting && <DashboardLoader />}
              {!isSubmitting && (
                <div className="row mx-0 mb-3">
                  <div className="col-7">
                    <TextInput
                      onChangeHandler={toolNameChangeHandler}
                      value={toolName}
                      name="name"
                      placeholder="إسم الآداة"
                    />
                  </div>
                  <div className="col-5">
                    <SubmitButton
                      title="تسجيل"
                      clickHandler={submitFormHandler}
                    />
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateToolModal;
