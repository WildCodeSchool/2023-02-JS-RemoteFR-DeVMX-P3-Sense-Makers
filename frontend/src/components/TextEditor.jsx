import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";
import { useRef } from "react";

function TextEditor({ name, title, dispatch }) {
  const refInit = useRef(null);

  const functionChange = () => {
    if (refInit.current) {
      return dispatch({
        type: "update_input",
        value: refInit.current.getContent(),
        key: `${name}`,
      });
    }
    return console.error("Content not saved");
  };
  return (
    <label htmlFor={`${name}_decision`}>
      {title} *
      <Editor
        id={`${name}_decision`}
        apiKey="kj8hy39rl1nje7nh6kf3etgbl37lrjlvhsxindvx30h9hskr"
        onChange={functionChange}
        onInit={(evt, editor) => {
          refInit.current = editor;
        }}
        initialValue={`<p>${name}</p>`}
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
  );
}

TextEditor.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dispatch: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.func.isRequired,
    key: PropTypes.string.isRequired,
  }).isRequired,
};
export default TextEditor;
