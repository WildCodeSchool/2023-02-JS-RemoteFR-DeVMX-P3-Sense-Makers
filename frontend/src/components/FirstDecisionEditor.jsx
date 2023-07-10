import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";

function TextEditor({ setFirstDecision }) {
  return (
    <label htmlFor="first_decision">
      <Editor
        id="first_decision"
        apiKey={`${import.meta.env.API_KEY}`}
        onEditorChange={(content) => setFirstDecision(content)}
        initialValue="<p>première prise de décision</p>"
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
  setFirstDecision: PropTypes.func.isRequired,
};
export default TextEditor;
