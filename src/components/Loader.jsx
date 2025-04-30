import { PuffLoader } from "react-spinners";
import SquareLoader from "react-spinners/SquareLoader";

export const LoaderSquare = () => {
    return (
        <div>
            <div className="flex items-center justify-center">
                <SquareLoader color="#185cfc" size={20}/>
                <p className="text-black text-xs ml-2">Processing...</p>
            </div>
        </div>
    )
}

export const LoaderPuff = () => {
    return (
        <div>
            <div className="flex items-center justify-center">
                <PuffLoader color="#185cfc" size={20}/>
                <p className="text-black text-xs ml-2">Processing...</p>
            </div>
        </div>
    )
}
