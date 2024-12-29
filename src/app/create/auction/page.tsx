import CarTypeForm from "../../components/ui/CarTypeForm"

export default function CreateAuction() {
    return (
        <div>
        <div className="px-12 font-semibold text-[30px]"><h1>Create an Auction</h1></div>
        
        <div className="flex justify-start items-baseline w-full h-screen px-[40px] pt-[50px]">
            <CarTypeForm/>
        </div>
        </div>
    )
}