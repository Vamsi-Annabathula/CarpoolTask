using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace CarPool.Providers
{
    class Mapper
    {
        private static MapperConfiguration Config { get; set; }

        public static D Map<T, D>(T data)
        {
            Config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<T, D>();
            });

            return Config.CreateMapper().Map<T, D>(data);
        }
    }
}
