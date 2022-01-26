"""
    datacube_catalog(catalog_geojson [optional])

this function returns a DataFrame of the catalog for all of the ITS_LIVE zarr datacubes. User can optionally provide the path to catalog_geojson

using ArchGDAL, DataFrames

# Example no inputs
```julia
julia> datacube_catalog()
```

```julia
julia> datacube_catalog(catalog_geojson = "path/to/catalog.json")
```

# Arguments
   - `catalog_geojson::String`: path to geojson catalog of ITS_LIVE datacubes

# Author
Alex S. Gardner
Jet Propulsion Laboratory, California Institute of Technology, Pasedena, California
January 25, 2022
"""

function datacube_catalog(catalog_geojson::String = "https://its-live-data.s3.amazonaws.com/datacubes/catalog_v02.json")
# set up aws configuration

    # read in catalog 
    catalog = ArchGDAL.read(catalog_geojson)
    
    # extract first and only layer
    layer = ArchGDAL.getlayer(catalog, 0)

    # convert to a dataframe
    return catalogdf = DataFrame(layer)
end