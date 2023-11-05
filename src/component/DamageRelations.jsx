import React, { useEffect, useState } from "react";

import Type from "../component/Type";
function DamageRelations({ damages }) {
  const [damagePokemonForm, setDamagePokemonForm] = useState();

  useEffect(() => {
    const arrayDamage = damages.map((damage) => separateObjectBetweenToAndFrom(damage));

    if (arrayDamage.length === 2) {
      const obj = joinDamageRelations(arrayDamage);
      setDamagePokemonForm(reduceDuplicateValues(postDamageValue(obj.from)));
    } else {
      setDamagePokemonForm(postDamageValue(arrayDamage[0].from));
    }
  }, [damages]);

  function joinDamageRelations(props) {
    return {
      to: joinObjects(props, "to"),
      from: joinObjects(props, "from"),
    };
  }

  function reduceDuplicateValues(props) {
    const duplicateValues = {
      double_damage: "4x",
      half_damage: "1/4x",
      no_damage: "0x",
    };

    return Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName;

      const verifiedValue = filterForUniqueValues(value, duplicateValues[key]);

      return (acc = { [keyName]: verifiedValue, ...acc });
    }, {});
  }

  function filterForUniqueValues(vlaueForFiltering, damageValue) {
    return vlaueForFiltering.reduce((acc, currentValue) => {
      const { url, name } = currentValue;

      const filterAcc = acc.filter((v) => v.name !== name);

      return filterAcc.length === acc.length
        ? (acc = [currentValue, ...acc])
        : (acc = [{ damageValue: damageValue, name, url }, ...filterAcc]);
    }, []);
  }

  function joinObjects(props, string) {
    const key = string;
    const firstArrayvalue = props[0][key];
    const secondArrayvalue = props[1][key];

    const result = Object.entries(secondArrayvalue).reduce((acc, [keyName, value]) => {
      const result = firstArrayvalue[keyName]?.concat(value);
      return (acc = { [keyName]: result, ...acc });
    }, {});
    return result;
  }

  function postDamageValue(props) {
    const result = Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName;

      const valueOfkeyName = {
        double_damage: "2x",
        half_damage: "1/2x",
        no_damage: "0x",
      };
      return (acc = {
        [keyName]: value.map((i) => ({
          damageValue: valueOfkeyName[key],
          ...i,
        })),
        ...acc,
      });
    }, {});
    return result;
  }

  function separateObjectBetweenToAndFrom(damage) {
    const from = filterDamageRelations("_from", damage);

    const to = filterDamageRelations("_to", damage);

    return { from, to };
  }

  function filterDamageRelations(valueFilter, danage) {
    const result = Object.entries(danage)
      .filter(([keyName, value]) => {
        return keyName.includes(valueFilter);
      })
      .reduce((acc, [keyName, value]) => {
        const keyWithValueFilterRemove = keyName.replace(valueFilter, "");
        return (acc = { [keyWithValueFilterRemove]: value, ...acc });
      }, {});
    return result;
  }

  return (
    <div className='flex gap-2 flex-col  w-full'>
      {damagePokemonForm ? (
        <>
          {Object.entries(damagePokemonForm).map(([keyName, value]) => {
            const key = keyName;
            const valuesOfkeyName = {
              double_damage: "Weak",
              half_damage: "Resistant",
              no_damage: "Immune",
            };

            return (
              <div key={key}>
                <h3
                  className=' capitalize font-medium text-sm md:text-base 
                     text-slate-500 text-center'
                >
                  {valuesOfkeyName[key]}
                </h3>
                <div className='flex flex-wrap gap-1 justify-center '>
                  {value.length > 0 ? (
                    value.map(({ name, url, damageValue }) => {
                      return <Type type={name} key={url} damageValue={damageValue} />;
                    })
                  ) : (
                    <Type type={"none"} key={"none"} />
                  )}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default DamageRelations;
