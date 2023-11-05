import React, { useEffect } from "react";

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
        //모달 안을 클릭 했는지
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
        // 모달 밖을 클릭 했는지};
    }

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);

  return <div>useOnClickOutside</div>;
}

export default useOnClickOutside;
