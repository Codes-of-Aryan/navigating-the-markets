import CommonModel from "./common/CommonModal";

export default function EvolutionStratergyAgentModal(props) {
    const api = "http://localhost:5000/lstm_model_one";
    const description = `eh?`;
    return (
        <CommonModel
            description={description}
            api={api}
            fullForm={props.fullForm}
            isDisabledUnits={false}
            isDisabledDropRate={false}
        />
    );
}
