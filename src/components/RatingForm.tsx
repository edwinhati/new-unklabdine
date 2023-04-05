import Header from "@/components/Header";
import Rating from "@/components/Rating";

export default function RatingForm({ mealtime }: any) {
  return (
    <>
      <Header label={mealtime} hasBack={true} />
      <form className="flex flex-col gap-2 w-full pt-16 pb-40 px-2 bg-white">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="font-bold uppercase">Makanan</h2>
            <p className="text-[12px] font-light text-gray-500">
              Berikan nilai untuk makanan di Cafetaria
            </p>
            <div className="flex justify-center items-center mt-1">
              <Rating value={3} setRating={() => {}} size={30} />
            </div>
            <div className="my-2">response</div>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h2 className="font-bold uppercase">Pelayanan</h2>
            <p className="text-[12px] font-light text-gray-500">
              Berikan nilai untuk pelayanan di Cafetaria
            </p>
            <div className="flex justify-center items-center mt-1">
              <Rating value={3} setRating={() => {}} size={30} />
            </div>
            <div className="my-2">response</div>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h2 className="font-bold uppercase">Lingkungan</h2>
            <p className="text-[12px] font-light text-gray-500">
              Berikan nilai untuk lingkungan di Cafetaria
            </p>
            <div className="flex justify-center items-center mt-1">
              <Rating value={3} setRating={() => {}} size={30} />
            </div>
            <p className="text-red-500 text-sm text-center -mt-3">message</p>
            <div className="my-2">response</div>
          </div>
        </div>
        <hr />
        <div className="my-2">
          <h2 className="font-bold uppercase">Komentar</h2>
          <p className="text-sm font-light text-gray-500 mb-3">
            Berikan komentar mengenai pengalamanmu
          </p>
          <textarea
            name="comment"
            id="comment"
            cols={30}
            rows={10}
            className="w-full h-40 bg-[#ECEBE9] rounded-md p-2 text-sm"
          />
        </div>
        <hr />
        <div className="mt-2">
          <h2 className="font-bold uppercase">Unggah Foto</h2>
          <p className="text-sm font-light text-gray-500 mb-3">opsional</p>
          <div className="flex flex-col gap-2">
            <label htmlFor="image" className="flex flex-col gap-2">
              <div className="flex flex-col items-center justify-center w-full h-[200px] bg-[#ECEBE9] rounded-md">
                <i className="fa-solid fa-camera text-[#D5D5D5] text-[30px]" />
                <p className="text-[#D5D5D5] text-sm mt-2">
                  Click to upload an image
                </p>
                <input type="file" name="image" id="image" className="hidden" />
              </div>
            </label>
            <p className="text-[9px] font-light text-gray-500 text-center">
              foto yang diunggah tidak akan ditampilkan secara publik
            </p>
          </div>
        </div>
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[600px] bg-white shadow-2xl border-t-2 px-5 py-5 flex flex-col justify-between">
          <div className="flex items-center mt-0">
            <input
              type="checkbox"
              name="anonymous"
              id="anonymous"
              className="mr-2"
            />
            <label
              htmlFor="anonymous"
              className="text-sm font-light text-gray-500"
            >
              Tampilkan penilaian saya secara anonim
            </label>
          </div>
          <button
            type="submit"
            className="bg-udine-1 w-full py-2 rounded-full text-white uppercase font-semibold mt-2"
          >
            Kirim
          </button>
        </div>
      </form>
    </>
  );
}
