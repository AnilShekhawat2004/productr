import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  multiple = false,
  editData = [],
}) {
  const inputRef = useRef(null);

  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    register(name, {
      required: true,
    });
  }, [register, name]);

  useEffect(() => {
    if (editData && editData.length > 0) {
      const formattedImages = editData.map((image) => ({
        preview: image,
        isOld: true,
      }));

      setSelectedFiles(formattedImages);
    }
  }, [editData]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const newFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      isOld: false,
    }));

    let updatedFiles = [...selectedFiles, ...newFiles];

    if (updatedFiles.length > 5) {
      updatedFiles = updatedFiles.slice(0, 5);
    }

    setSelectedFiles(updatedFiles);

    const onlyNewFiles = updatedFiles
      .filter((item) => !item.isOld)
      .map((item) => item.file);

    setValue(name, onlyNewFiles, {
      shouldValidate: true,
    });
  };

  const removeImage = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);

    setSelectedFiles(updatedFiles);

    const onlyNewFiles = updatedFiles
      .filter((item) => !item.isOld)
      .map((item) => item.file);

    setValue(name, onlyNewFiles, {
      shouldValidate: true,
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-black text-[0.9rem] font-medium">{label}</label>

        <button
          type="button"
          onClick={() => inputRef.current.click()}
          className="text-[0.85rem] font-medium text-[#071074] hover:underline"
        >
          Add More Photos
        </button>
      </div>

      <div
        onClick={() => inputRef.current.click()}
        className="min-h-[110px] w-full rounded-[12px] border border-dashed border-gray-300 bg-[#fafafa] p-3"
      >
        <div className="flex flex-wrap gap-3">
          {selectedFiles.map((item, index) => (
            <div
              key={index}
              className="relative h-[70px] w-[70px] rounded-[10px] border border-gray-200 bg-white"
            >
              <img
                src={item.preview}
                alt="preview"
                className="h-full w-full rounded-[10px] object-cover"
              />

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute -right-2 -top-2 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-gray-200 text-black shadow-sm hover:bg-red-500 hover:text-white"
              >
                <IoClose className="text-[13px]" />
              </button>
            </div>
          ))}

          {selectedFiles.length === 0 && (
            <div className="flex h-[70px] w-full items-center justify-center text-sm text-gray-400">
              Click to Upload Images
            </div>
          )}
        </div>

        <input
          type="file"
          ref={inputRef}
          multiple={multiple}
          accept="image/png, image/jpeg, image/jpg"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {errors[name] && (
        <span className="text-sm text-red-500">{label} is required</span>
      )}
    </div>
  );
}

export default Upload;
