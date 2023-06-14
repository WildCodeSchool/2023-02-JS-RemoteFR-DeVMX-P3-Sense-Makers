/* eslint-disable react/jsx-props-no-spreading */
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";

export default function Dropzone({ className, setDropzoneImage }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setDropzoneImage(
        acceptedFiles.map((image) =>
          Object.assign(image, {
            preview: URL.createObjectURL(image),
          })
        )
      );
    }
  }, []);
  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg"], "image/png": [".png"] },
    maxSize: 1024 * 1000,
    multiple: false,
  });

  return (
    <div
      {...getRootProps({
        className,
      })}
    >
      <input {...getInputProps()} />
      <p className="dropzone-placeholder-text">Drop the image here </p>
      {isDragReject && <p>Only images *.jpeg or *.png</p>}
    </div>
  );
}

Dropzone.propTypes = {
  className: PropTypes.string.isRequired,
  setDropzoneImage: PropTypes.func.isRequired,
};
