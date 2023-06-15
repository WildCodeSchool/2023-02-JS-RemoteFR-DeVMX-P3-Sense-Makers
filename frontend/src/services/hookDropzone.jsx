/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";

export default function Dropzone({ className, setDropzoneImage }) {
  const imageRef = useRef();
  console.info("🚀 - imageRef:", imageRef);

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
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
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
        <input {...getInputProps()} ref={imageRef} />
        <p className="dropzone-placeholder-text">Drop the image here </p>
      </div>
      {fileRejections && <span>{fileRejections[0]?.errors[0].message}</span>}
    </>
  );
}

Dropzone.propTypes = {
  className: PropTypes.string.isRequired,
  setDropzoneImage: PropTypes.func.isRequired,
};
