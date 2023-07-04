/* eslint-disable react/jsx-props-no-spreading */
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import PropTypes from "prop-types";

export default function Dropzone({
  className,
  setDropzoneImage,
  setNewUploadedFileName,
}) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setDropzoneImage(
        acceptedFiles.map((image) =>
          Object.assign(image, {
            preview: URL.createObjectURL(image),
          })
        )
      );

      const formData = new FormData();
      formData.append("photo", acceptedFiles[0]);

      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/uploads`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((result) => {
          console.info(result);
          setNewUploadedFileName(result.data.newUploadedFileName);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const { getRootProps, getInputProps, fileRejections, isDragActive } =
    useDropzone({
      onDrop,
      maxSize: 1048576,
      accept: { "image/*": [".jpeg"], "image/png": [".png"] },
      multiple: false,
    });

  return (
    <>
      <div
        {...getRootProps({
          className,
        })}
      >
        <input {...getInputProps()} />
        <p
          className={
            isDragActive
              ? "dropzone-placeholder-text dropzone-active"
              : "dropzone-placeholder-text"
          }
        >
          Déposer un fichier de image ici
        </p>
      </div>
      {fileRejections && <span>{fileRejections[0]?.errors[0].message}</span>}
    </>
  );
}

Dropzone.propTypes = {
  className: PropTypes.string.isRequired,
  setDropzoneImage: PropTypes.func.isRequired,
  setNewUploadedFileName: PropTypes.func.isRequired,
};
