import ResetButton from "../components/buttons/reset-button";
import SubmitButton from "../components/buttons/submit-button";
import ModalFooter from "../components/bootstrap-modal/modal-footer";
import ModalHeader from "../components/bootstrap-modal/modal-header";
import NumberInput from "../components/inputs/number-input";
import SelectInput from "../components/inputs/select-input";
import { useStore } from "../../hooks-store/store";
import { useState } from "react";
import { useEffect } from "react";
import { httpGET } from "../../http/httpGET";
import { api } from "../../utility/api";
import DashboardLoader from "../components/loader/dashboardLoader";
import { httpPOST } from "../../http/httpPOST";
import { closeBootstrapModal } from "../../utility/close-bootstrap-modal";

const CreatePurchasesModal = () => {
  const [state, dispatch] = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [tools, setTools] = useState([]);
  const [purchase, setPurchase] = useState({});
  const [errors, setErrors] = useState({});

  const inputChangeHandler = (event) => {
    const value = event.target.value.trim();
    const name = event.target.name.trim();
    const purchaseData = { ...purchase };
    purchaseData[name] = value;
    setPurchase({ ...purchaseData });
  };

  useEffect(() => {
    //get all tools
    if (!state.tools_store.isInitiated) {
      setIsLoading(true);
      httpGET(api.tools.get_all_tools)
        .then((tools) => {
          if (tools.length !== 0) dispatch("INITIATE_TOOLS", tools);
          setTools(
            tools.map((tool) => {
              return { text: tool.name, value: tool.id };
            })
          );
          setIsLoading(false);
        })
        .catch((c) => {
          alert("Network error while fetching tools!!");
          setIsLoading(false);
        });
    } else {
      setTools(
        state.tools_store.tools.map((tool) => {
          return { text: tool.name, value: tool.id };
        })
      );
    }
  }, []);

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (!purchase.toolId) {
      setErrors({ ...errors, toolId: "يجب إختيار الآداة من هنا." });
      return;
    }
    if (!purchase.price) {
      setErrors({ ...errors, price: "أدخل السعر هنا." });
      return;
    }
    if (!purchase.quantity) {
      setErrors({ ...errors, quantity: "حدد الكمية هنا." });
      return;
    }
    setErrors({});

    setIsSubmitting(true);
    httpPOST(api.purchases.create_purchase, {
      toolId: purchase.toolId,
      price: purchase.price,
      quantity: purchase.quantity,
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
            dispatch("ADD_PURCHASE_TO_STORE", data);

            setPurchase({});
            setIsSubmitting(false);
            closeBootstrapModal();
          });
        }
      })
      .catch((c) => {
        alert("Network error while adding your purchase!!");
        setIsSubmitting(false);
        closeBootstrapModal();
      });
  };
  return (
    <div>
      <div
        className="modal fade bg-blue-dark"
        data-bs-backdrop="static"
        id="createNewPurchaseModal"
        tabIndex="-1"
        aria-labelledby="createNewPurchaseModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content bg-blue-light">
            <form>
              <ModalHeader title="تسجيل مشتريات" />

              <div className="row m-0 p-2">
                <div className="col-4">
                  {isLoading && <DashboardLoader text="تحميل الأدوات..." />}
                  {!isLoading && (
                    <SelectInput
                      onChangeHandler={inputChangeHandler}
                      items={tools}
                      selectedValue={purchase.toolId}
                      name="toolId"
                      title="إسم الآداة"
                    />
                  )}
                </div>
                <div className="col-4">
                  <NumberInput onChangeHandler={inputChangeHandler} value={purchase.price??''} name="price" placeholder="السعر" />
                </div>
                <div className="col-4">
                  <NumberInput onChangeHandler={inputChangeHandler} value={purchase.quantity??''} name="quantity" placeholder="الكمية/العدد" />
                </div>
              </div>

              <ModalFooter>
                <SubmitButton title="تسجيل" clickHandler={submitFormHandler} />
                <ResetButton title="تفريغ الحقول" />
              </ModalFooter>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePurchasesModal;
