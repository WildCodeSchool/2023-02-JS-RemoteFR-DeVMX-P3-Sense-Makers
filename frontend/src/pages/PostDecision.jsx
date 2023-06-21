import { useEffect, useReducer, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";
import { Editor } from "@tinymce/tinymce-react";

/* Style selector */
const customStyles = {
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#bdbdbd",
      zIndex: 5000,
    };
  },
  control: (base) => ({
    ...base,
    boxShadow: "5px 5px 8px #bdbdbd",
    borderRadius: "10px",
    width: "auto",
    minWidth: "30vw",
  }),
};

/* Reducer definition */
function reducer(state, action) {
  switch (action.type) {
    case "update_input":
      return {
        ...state,
        [action.key]: action.value,
      };
    case "update_hubID":
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return state;
  }
}
export default function PostDecision() {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const [expertUsers, setExpertUsers] = useState();
  const [impacted, setImpacted] = useState([]);
  const [experts, setExperts] = useState([]);
  const [hub, setHub] = useState([]);
  const [selectedHub, setSelectedHub] = useState();

  /*  reducer initialisation */
  const initialState = {
    title: "",
    content: "",
    usefulness: "",
    context: "",
    benefit: "",
    disadvantages: "",
    concerned_hub_id: 0,
    positives_votes: 0,
    negatives_votes: 0,
    status_id: 1,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  /* Add the  Hub id to send in the Back */
  const addID = () => {
    for (let i = 0; i < hub.length; i += 1) {
      if (hub[i].title === selectedHub) {
        dispatch({
          type: "update_hubID",
          value: hub[i].id,
          key: "concerned_hub_id",
        });
      }
    }
  };

  /* import users & experts for select */

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/concat`)
      .then((response) => {
        setUsers(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/experts`)
      .then((response) => {
        setExpertUsers(response.data);
      });
  }, []);

  /* Import concerned Hub  */
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/concernedhub`)
      .then((response) => {
        setHub(response.data);
      });
  }, []);

  /* Fonction for experts & impacted selection */
  const filterUsers = (inputValue) => {
    return users.filter((user) =>
      user.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptionsUsers = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterUsers(inputValue));
    }, 500);
  };

  const filterExperts = (inputValue) => {
    return expertUsers.filter((expertUser) =>
      expertUser.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptionExperts = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterExperts(inputValue));
    }, 500);
  };

  /* Update  experts & impacted on the decision */
  const onChangeExpert = (inputValue) => {
    setExperts(inputValue);
  };

  const onChangeImpacted = (inputValue) => {
    setImpacted(inputValue);
  };

  /* Post decision to the back */
  function DecisionPosted(status) {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/decisions`, status)
      .then((response) => {
        if (response.status === 201) {
          experts.map((expert) => {
            return axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/decisions/:id/expert`,
              { expertId: expert.id, decisionId: response.data[0].insertId }
            );
          });
          impacted.map((impact) => {
            return axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/decisions/:id/impacted`,
              { impactedId: impact.id, decisionId: response.data[0].insertId }
            );
          });
          setTimeout(() => {
            navigate(`/decisions/${response.data[0].insertId}`);
          }, 250);
        }
      });
  }
  /* ref for text editor */
  const contentRef = useRef(null);
  const usefulnessRef = useRef(null);
  const contextRef = useRef(null);
  const benefitRef = useRef(null);
  const disadvantagesRef = useRef(null);

  const sendContent = () => {
    if (contentRef.current) {
      console.info(contentRef.current.getContent());
      return dispatch({
        type: "update_input",
        value: contentRef.current.getContent(),
        key: "content",
      });
    }
    return console.error("Content not saved");
  };
  const sendUsefulness = () => {
    if (usefulnessRef.current) {
      console.info(usefulnessRef.current.getContent());
      return dispatch({
        type: "update_input",
        value: usefulnessRef.current.getContent(),
        key: "usefulness",
      });
    }
    return console.error("Usefulness not saved");
  };
  const sendContext = () => {
    if (contextRef.current) {
      console.info(contextRef.current.getContent());
      return dispatch({
        type: "update_input",
        value: contextRef.current.getContent(),
        key: "context",
      });
    }
    return console.error("Context not saved");
  };
  const sendBenefit = () => {
    if (benefitRef.current) {
      console.info(benefitRef.current.getContent());
      return dispatch({
        type: "update_input",
        value: benefitRef.current.getContent(),
        key: "benefit",
      });
    }
    return console.error("Benefit not saved");
  };
  const sendDisadvantages = () => {
    if (disadvantagesRef.current) {
      console.info(disadvantagesRef.current.getContent());
      return dispatch({
        type: "update_input",
        value: disadvantagesRef.current.getContent(),
        key: "disadvantages",
      });
    }
    return console.error("Sisadvantages not saved");
  };

  return (
    <div className="post-container">
      <div className="title-container">
        <h1 className="post-decision">Poster une décision </h1>
      </div>

      <div className="decision-information">
        <label htmlFor="title_decision">
          Titre de la décision *
          <input
            type="text"
            id="title_decision"
            className="title-decision"
            placeholder="Déménager hors de Paris..."
            value={state.title}
            onChange={(e) => {
              dispatch({
                type: "update_input",
                value: e.target.value,
                key: "title",
              });
            }}
          />
        </label>

        <div className="hub-container">
          <label htmlFor="hub_decision">
            Pôle concerné *
            <select
              id="hub_decision"
              value={selectedHub}
              defaultValue="--"
              onChange={(e) => {
                setSelectedHub(e.target.value);
              }}
            >
              <option value="--">--</option>
              {hub.map((hu) => {
                return (
                  <option key={hu.id} value={hu.title}>
                    {hu.title}
                  </option>
                );
              })}
            </select>
          </label>
          {selectedHub && <div className="hub-select">{selectedHub}</div>}
        </div>

        <div className="impacted-people">
          <label htmlFor="concerned_decision">
            Personnes concernées *
            <AsyncSelect
              styles={customStyles}
              cacheOptions
              defaultOptions={users}
              loadOptions={loadOptionsUsers}
              isMulti
              onChange={onChangeImpacted}
            />
          </label>

          <label htmlFor="expert_decision">
            Personnes expertes *
            <AsyncSelect
              styles={customStyles}
              cacheOptions
              defaultOptions={expertUsers}
              loadOptions={loadOptionExperts}
              isMulti
              onChange={onChangeExpert}
            />
          </label>
        </div>
      </div>

      <div className="decision-write">
        <label htmlFor="description_decision">
          Description de la décision *
          <Editor
            apiKey="kj8hy39rl1nje7nh6kf3etgbl37lrjlvhsxindvx30h9hskr"
            onInit={(evt, editor) => {
              contentRef.current = editor;
            }}
            initialValue="<p>Description.</p>"
            init={{
              statusbar: false,
              toolbar_location: "bottom",
              branding: false,
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </label>
        <label htmlFor="usefulness_decision">
          Utilité de cette décision pour l'organisation *
          <Editor
            apiKey="kj8hy39rl1nje7nh6kf3etgbl37lrjlvhsxindvx30h9hskr"
            onInit={(evt, editor) => {
              usefulnessRef.current = editor;
            }}
            initialValue="<p>Usefulness.</p>"
            init={{
              statusbar: false,
              toolbar_location: "bottom",
              branding: false,
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </label>
        <label htmlFor="context_decision">
          Contexte autour de la décision *
          <Editor
            apiKey="kj8hy39rl1nje7nh6kf3etgbl37lrjlvhsxindvx30h9hskr"
            onInit={(evt, editor) => {
              contextRef.current = editor;
            }}
            initialValue="<p>Context.</p>"
            init={{
              statusbar: false,
              toolbar_location: "bottom",
              branding: false,
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </label>
        <label htmlFor="benefit_decision">
          Bénéfices de la décision *
          <Editor
            apiKey="kj8hy39rl1nje7nh6kf3etgbl37lrjlvhsxindvx30h9hskr"
            onInit={(evt, editor) => {
              benefitRef.current = editor;
            }}
            initialValue="<p>Benefit.</p>"
            init={{
              statusbar: false,
              toolbar_location: "bottom",
              branding: false,
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </label>
        <label htmlFor="disadvantages_decision">
          Inconvenients de la décision *
          <Editor
            apiKey="kj8hy39rl1nje7nh6kf3etgbl37lrjlvhsxindvx30h9hskr"
            onInit={(evt, editor) => {
              disadvantagesRef.current = editor;
            }}
            initialValue="<p>Disadvantages.</p>"
            init={{
              statusbar: false,
              toolbar_location: "bottom",
              branding: false,
              height: 500,
              menubar: false,
              zIndex: -1,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </label>
      </div>

      <div className="button-container">
        <button
          type="button"
          onClick={() => {
            sendContent();
            sendUsefulness();
            sendContext();
            sendBenefit();
            sendDisadvantages();
            DecisionPosted(state);
            addID();
          }}
        >
          Poster cette décision
        </button>
      </div>
    </div>
  );
}
