/* eslint-disable react/jsx-key */
import Header from "@/components/Header";
import Rating from "@/components/Rating";
import { useState } from "react";
import { useUser } from "@/context";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firestore, storage } from "@/config";
import { getDate } from "@/pages/api/rating/mealtime";

const ASPECTS = {
  food: ["Rasa", "Kelayakan", "Nutrisi"],
  service: ["Sikap", "Higienis", "Efisiensi"],
  environment: ["Kebersihan", "Kerapihan", "Kenyamanan"],
};

export default function RatingForm({ mealtime }: any) {
  const { user, noreg } = useUser();
  const [foodRating, setFoodRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);
  const [environmentRating, setEnvironmentRating] = useState(0);
  const [foodAspects, setFoodAspects] = useState<string[]>([]);
  const [serviceAspects, setServiceAspects] = useState<string[]>([]);
  const [environmentAspects, setEnvironmentAspects] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [isAnonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const getResponse = (rating: number) => {
    if (rating === 1) return "Apa yang menurut anda buruk?";
    if (rating === 2) return "Apa yang menurut anda kurang baik?";
    if (rating === 3) return "Apa yang menurut anda cukup?";
    if (rating === 4) return "Apa yang menurut anda baik?";
    if (rating === 5) return "Apa yang menurut anda sangat baik?";
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    let imageURL = "";
    try {
      if (image) {
        const storageRef = ref(
          storage,
          `images/${noreg}_${getDate()}_${mealtime}`
        );
        const snapshot = await uploadBytes(storageRef, image);
        imageURL = await getDownloadURL(snapshot.ref);
      }

      const response = {
        food: {
          rating: foodRating,
          aspects: foodAspects,
        },
        service: {
          rating: serviceRating,
          aspects: serviceAspects,
        },
        environment: {
          rating: environmentRating,
          aspects: environmentAspects,
        },
        comment,
        isAnonymous,
        image: imageURL,
        name: user.displayName,
        photo: user.photoURL,
        token: user.accessToken,
        createdAt: Timestamp.now(),
      };

      if (foodRating === 0 || serviceRating === 0 || environmentRating === 0) {
        setMessage("Harap isi semua bagian rating");
        setLoading(false);
        return;
      } else {
        await setDoc(doc(firestore, "responses", getDate()), {});
        await setDoc(
          doc(
            firestore,
            `responses/${getDate()}/${mealtime.toLowerCase()}`,
            noreg
          ),
          response
        );
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header label={mealtime} hasBack={true} />
      <form className="flex flex-col gap-2 w-full pt-16 pb-40 px-2 bg-white">
        <div className="flex flex-col justify-center items-center">
          {message && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-2 rounded relative" role="alert">
              <span className="block sm:inline">{message}</span>
            </div>
          )}
          <div className="flex flex-col gap-2 text-center">
            <h2 className="font-bold uppercase">Makanan</h2>
            <p className="text-[12px] font-light text-gray-500">
              Berikan nilai untuk makanan di Cafetaria
            </p>
            <div className="flex justify-center items-center mt-1">
              <Rating value={foodRating} setRating={setFoodRating} size={30} />
            </div>
            <div className="my-2">
              <p className="text-sm text-center font-light text-gray-500 mb-3">
                {getResponse(foodRating)}
              </p>
              <div className="flex gap-1 flex-wrap justify-center items-center">
                {foodRating ? (
                  <div className="flex flex-row gap-2">
                    {ASPECTS.food.map((aspect) => (
                      <div className="flex gap-1 items-center">
                        <input
                          type="checkbox"
                          id={aspect}
                          name={aspect}
                          value={aspect}
                          className="w-4 h-4 hidden aspect-input "
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFoodAspects([...foodAspects, e.target.value]);
                            } else {
                              setFoodAspects(
                                foodAspects.filter(
                                  (item) => item !== e.target.value
                                )
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={aspect}
                          className="bg-[#F2F2F2] text-[13px] py-1 px-2 rounded-lg aspect-label"
                        >
                          {aspect}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h2 className="font-bold uppercase">Pelayanan</h2>
            <p className="text-[12px] font-light text-gray-500">
              Berikan nilai untuk pelayanan di Cafetaria
            </p>
            <div className="flex justify-center items-center mt-1">
              <Rating
                value={serviceRating}
                setRating={setServiceRating}
                size={30}
              />
            </div>
            <div className="my-2">
              <p className="text-sm text-center font-light text-gray-500 mb-3">
                {getResponse(serviceRating)}
              </p>
              <div className="flex gap-1 flex-wrap justify-center items-center">
                {serviceRating ? (
                  <div className="flex flex-row gap-2">
                    {ASPECTS.service.map((aspect) => (
                      <div className="flex gap-1 items-center">
                        <input
                          type="checkbox"
                          id={aspect}
                          name={aspect}
                          value={aspect}
                          className="w-4 h-4 hidden aspect-input "
                          onChange={(e) => {
                            if (e.target.checked) {
                              setServiceAspects([
                                ...serviceAspects,
                                e.target.value,
                              ]);
                            } else {
                              setServiceAspects(
                                serviceAspects.filter(
                                  (item) => item !== e.target.value
                                )
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={aspect}
                          className="bg-[#F2F2F2] text-[13px] py-1 px-2 rounded-lg aspect-label"
                        >
                          {aspect}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h2 className="font-bold uppercase">Lingkungan</h2>
            <p className="text-[12px] font-light text-gray-500">
              Berikan nilai untuk lingkungan di Cafetaria
            </p>
            <div className="flex justify-center items-center mt-1">
              <Rating
                value={environmentRating}
                setRating={setEnvironmentRating}
                size={30}
              />
            </div>
            {/* <p className="text-red-500 text-sm text-center -mt-3">message</p> */}
            <div className="my-2">
              <p className="text-sm text-center font-light text-gray-500 mb-3">
                {getResponse(environmentRating)}
              </p>
              <div className="flex gap-1 flex-wrap justify-center items-center">
                {environmentRating ? (
                  <div className="flex flex-row gap-2">
                    {ASPECTS.environment.map((aspect) => (
                      <div className="flex gap-1 items-center">
                        <input
                          type="checkbox"
                          id={aspect}
                          name={aspect}
                          value={aspect}
                          className="w-4 h-4 hidden aspect-input "
                          onChange={(e) => {
                            if (e.target.checked) {
                              setEnvironmentAspects([
                                ...environmentAspects,
                                e.target.value,
                              ]);
                            } else {
                              setEnvironmentAspects(
                                environmentAspects.filter(
                                  (item) => item !== e.target.value
                                )
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={aspect}
                          className="bg-[#F2F2F2] text-[13px] py-1 px-2 rounded-lg aspect-label"
                        >
                          {aspect}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
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
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        </div>
        <hr />
        <div className="mt-2">
          <h2 className="font-bold uppercase">Unggah Foto</h2>
          <p className="text-sm font-light text-gray-500 mb-3">opsional</p>
          <div className="flex flex-col gap-2">
            <label htmlFor="image" className="flex flex-col gap-2">
              <div className="flex flex-col items-center justify-center w-full h-[150px] bg-[#ECEBE9] rounded-md">
                {image ? (
                  <>
                    <i className="fa-solid fa-check text-[#D5D5D5] text-[32px]" />
                    <p className="text-[#D5D5D5] text-sm mt-2">
                      Image uploaded
                    </p>
                    <p className="text-gray-400 text-sm mt-2">{image.name}</p>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-camera text-[#D5D5D5] text-[30px]" />
                    <p className="text-[#D5D5D5] text-sm mt-2">
                      Click to upload an image
                    </p>
                  </>
                )}
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="hidden"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      setImage(files[0]);
                    }
                  }}
                />
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
              onChange={(e) => {
                setAnonymous(e.target.checked);
              }}
            />
            <label
              htmlFor="anonymous"
              className="text-sm font-light text-gray-500"
            >
              Tampilkan penilaian saya secara anonim
            </label>
          </div>
          {loading ? (
            <button className="bg-udine-5 w-full py-2 rounded-full text-white uppercase font-semibold mt-2">
              <i className="fa-solid fa-spinner animate-spin mr-2 text-[15px]" />
              Loading
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-udine-1 w-full py-2 rounded-full text-white uppercase font-semibold mt-2"
            >
              Kirim
            </button>
          )}
        </div>
      </form>
    </>
  );
}
