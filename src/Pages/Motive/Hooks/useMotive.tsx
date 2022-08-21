import { useEffect, useState } from 'react';
import { GetAllMotive } from '../../../API/GetAllMotive';

export interface IMotives {
  _id: string;
  idDesign: string;
  urlDesign: string;
  price: number;

}

export const useMotive = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [motives, setMotives] = useState<IMotives[]>();

  useEffect(() => {
    setIsLoading(true);
    GetAllMotive()
      .then((res: any) => {
        let tempIdJersey: string[] = [];

        for (let i = 0; i < res?.data.dtMotif.length; i++) {
          tempIdJersey.push(i < 10 ? `0${i + 1}11` : `${i + 1}11`);
        }

        const filterInitialMotives = res?.data.dtMotif?.filter(
          (jersey: IMotives) => tempIdJersey?.includes(jersey.idDesign)
        );

        setMotives(filterInitialMotives);
      })
      .catch((err) => {
        return err;
      })
      .finally(() => setIsLoading(false));
  }, []);

  return {
    motives,
    isLoading,
  };
};
