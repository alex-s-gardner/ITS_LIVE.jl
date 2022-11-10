"""
CartesianIndex = nearestxy(lat,lon,dc)

return the `CartesianIndex` indices into a ZarrGroup (`dc`) for the points nearest the provided `lat`, `lon` locations

using Proj

# Example

```julia
julia> nearestxy(lat,lon,dc)
```

# Arguments
   - `lat::::Union{Vector,Number}`: latitude between -90 and 90 degrees
   - `lon::::Union{Vector,Number}`: latitude between -180 and 180 degrees
   - `dc:::ZGroup{Zarr.ConsolidatedStore{Zarr.HTTPStore}}`: ITS_LIVE data cube:: Zarr DataArray 
"""
function nearestxy(lat::Union{Vector,Number}, lon::Union{Vector,Number}, dc::Union{ZGroup{Zarr.ConsolidatedStore{Zarr.HTTPStore}}, ZGroup{S3Store}})
  # check that lat is within range
  if any(lat .< -90) || any(lat .> 90)
    error("lat = $lat, not in range [-90 to 90]")
  end

  # check that lon is within range
  if any(lon .<-180) || any(lon .> 180)
    error("lon = $lon, not in range [-180 to 180]")
  end

  # define function that returns nearest point -or- missing if point is further than 1 gridcell
  function nearest_within(xPt, x)
    xWithin = abs(x[2] - x[1])
    xdist = abs.(x .- xPt)
    xdistmin,  xind0 = findmin(xdist)
  
    if (xdistmin > xWithin)
      xind0 = nothing
    end
  
    return xind0
  end
  
  # convert lat and lon into projected datacube coordinates
  trans = Proj.Transformation("EPSG:4326", "EPSG:" * dc.attrs["projection"])
  pt = trans.(eachrow(hcat(lat, lon)))

  # find the nearest x/y location with 1 full gridcell distance
  xind = nearest_within.(first.(pt), Ref(dc["x"][:]))
  yind = nearest_within.(last.(pt), Ref(dc["y"][:]))

  xind = round.(Int,xind)
  yind = round.(Int,yind)

  return CartesianIndex.(xind',yind')

end
