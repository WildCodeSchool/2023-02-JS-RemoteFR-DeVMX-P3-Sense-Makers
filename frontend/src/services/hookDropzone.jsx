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
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: 1024 * 1000,
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps({
        className,
      })}
    >
      <input {...getInputProps()} />
      <p className="dropzone-placeholder-text">Drop the image here </p>
    </div>
  );
}

Dropzone.propTypes = {
  className: PropTypes.string.isRequired,
  setDropzoneImage: PropTypes.func.isRequired,
};
