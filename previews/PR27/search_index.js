var documenterSearchIndex = {"docs":
[{"location":"#ItsLive.jl","page":"ItsLive.jl","title":"ItsLive.jl","text":"","category":"section"},{"location":"","page":"ItsLive.jl","title":"ItsLive.jl","text":"Documentation for ItsLive.jl","category":"page"},{"location":"","page":"ItsLive.jl","title":"ItsLive.jl","text":"ItsLive.catalog","category":"page"},{"location":"#ItsLive.catalog","page":"ItsLive.jl","title":"ItsLive.catalog","text":"catalog([catalog_geojson::String])\n\nreturn a DataFrame (catalogdf) of the catalog for all of the ITSLIVE zarr datacubes.  User can optionally provide the path to `cataloggeojson`\n\nusing ArchGDAL, DataFrames\n\nExample no inputs\n\njulia> catalog()\n\njulia> catalog(catalog_geojson = \"path/to/catalog.json\")\n\nArguments\n\ncatalog_geojson::String: path to geojson catalog of ITS_LIVE datacubes\n\nAuthor\n\nAlex S. Gardner, JPL, Caltech.\n\n\n\n\n\n","category":"function"},{"location":"","page":"ItsLive.jl","title":"ItsLive.jl","text":"ItsLive.getvar","category":"page"},{"location":"#ItsLive.getvar","page":"ItsLive.jl","title":"ItsLive.getvar","text":"C = getvar(lat,lon, varnames, catalogdf])\n\nreturn a named m x n matrix of vectors (C) with m = length(lat) rows  and n = length(varnames)+2(for lat and lon) columns for the points nearest  the lat/lon location from ITS_LIVE Zarr datacubes\n\nuse catalog.jl to generate the DataFrame catalog (catalogdf) of the ITS_LIVE zarr datacubes\n\nusing DataFrames Dates NamedArrays\n\nExample\n\njulia> getvar(69.1,-49.4, [\"mid_date\", \"v\"], catalogdf)\n\nArguments\n\nlat::Union{Vector,Number}: latitude between -90 and 90 degrees\nlon::Union{Vector,Number}: latitude between -180 and 180 degrees\nvarnames::Unions{String, Vector{String}}: name of variables to extract from Zarr DataFrame\ncatalogdf::DataFrame: DataFrame catalog of the ITS_LIVE zarr datacubes\n\nAuthor\n\nAlex S. Gardner, JPL, Caltech.\n\n\n\n\n\n","category":"function"},{"location":"","page":"ItsLive.jl","title":"ItsLive.jl","text":"ItsLive.plotvar","category":"page"},{"location":"#ItsLive.plotvar","page":"ItsLive.jl","title":"ItsLive.plotvar","text":"p = plotvar(C::Named Matrix{Any}, varname::String)\n\nplot its_live data (`C`) variable (`varname`) for multiple points\n\nExample no inputs\n\njulia> p = plotvar(C, varname)\n\nArguments\n\nC::Named Matrix{Any}: ITS_LIVE named matrix\nvarname::String: variable name to plot\n\nKeyword Arguments\n\n- `dtmax::Number`: maximum time seperation between image pairs [days] to plot\n\nAuthor\n\nAlex S. Gardner, JPL, Caltech.\n\n\n\n\n\n","category":"function"},{"location":"","page":"ItsLive.jl","title":"ItsLive.jl","text":"ItsLive.plotbysensor","category":"page"},{"location":"#ItsLive.plotbysensor","page":"ItsLive.jl","title":"ItsLive.plotbysensor","text":"p = plotbysensor(C, varname; dtmax::Number = Inf))\n\nplot its_live data (`C`) variable (`varname`) by sensor type\n\nExample no inputs\n\njulia> p = plotbysensor(x,y,sensor)\n\nArguments\n\nC::Named Matrix{Any}: ITS_LIVE named matrix [size(C,2) must = 1]\nvarname::String: variable name to plot\n\nKeyword Arguments\n\n- `dtmax::Number`: maximum time seperation between image pairs [days] to plot\n\nAuthor\n\nAlex S. Gardner, JPL, Caltech.\n\n\n\n\n\n","category":"function"},{"location":"","page":"ItsLive.jl","title":"ItsLive.jl","text":"ItsLive.sensorfilter","category":"page"},{"location":"#ItsLive.sensorfilter","page":"ItsLive.jl","title":"ItsLive.sensorfilter","text":"id_exclude = sensorfilter(vx, vy, mid_date, dt, sensor; binedges, mincount, dtmax, id_refsensor, plotflag)\n\nidentify sensors that produce velocities that are sginificanlty slower\n\nExample no inputs\n\njulia> id_exclude = sensorfilter(C[1,\"vx\"], C[1,\"vy\"], C[1,\"mid_date\"], C[1,\"date_dt\"], C[1,\"satellite_img1\"])\n\nArguments\n\n- `vx::Vector{Any}`: x component velocity\n- `vy::Vector{Any}`: y component velocity\n- `mid_date::Vector{DateTime}`: center date of image-pair [] \n- `dt::Vector{Any}`: time seperation between image pairs [days]\n- `sensor::Vector{Any}`: list of image sensors for image-pairs... used to group results\n\n- `id_exclude`: sesnor ids that should be excluded [none should be excluded if empty]\n\nAuthor\n\nAlex S. Gardner, JPL, Caltech.\n\n\n\n\n\n","category":"function"},{"location":"","page":"ItsLive.jl","title":"ItsLive.jl","text":"ItsLive.vxvyfilter","category":"page"},{"location":"#ItsLive.vxvyfilter","page":"ItsLive.jl","title":"ItsLive.vxvyfilter","text":"outlier, dtmax, sensorgroups = vxvyfilter(vx,vy,dt; sensor)\n\nidentify 'outlier's for which the vx or vy distibution changes for longer dt. 'dtmax' identified for each 'sensorgroups'\n\nThis filter is needed to identify longer dts that exhibit \"skipping\" or \"locking\" behavior in feature tracking estimates of surface flow. This happens when the surface texture provides a lesser match than to stationary features, due to long time separation between repeat images, such as ice falls and curved medial moraines.\n\nusing Statistics\n\nExample\n\njulia> outlier, dtmax, sensorgroups = vxvyfilter(vx,vy,dt,sensor)\n\nArguments\n\nvx::Vector{Any}: x component velocity\nvy::Vector{Any}: y component velocity\ndt::Vector{Any}: time seperation between image pairs [days]\nsensor::Vector{Any}: list of image sensors for image-pairs... used to group results\n\nAuthor\n\nAlex S. Gardner, JPL, Caltech.\n\n\n\n\n\n","category":"function"},{"location":"","page":"ItsLive.jl","title":"ItsLive.jl","text":"ItsLive.lsqfit_annual","category":"page"},{"location":"#ItsLive.lsqfit_annual","page":"ItsLive.jl","title":"ItsLive.lsqfit_annual","text":"t_fit, v_fit, amp_fit, phase_fit, v_fit_err, amp_fit_err, fit_count, fit_outlier_frac, outlier =\n    lsqfit_annual(v,v_err,mid_date,date_dt; mad_thresh[optional], iterations[optional], model[optional])\n\nannual error wighted model fit to discrete interval data \n\nusing Statistics\n\nExample\n\njulia> t_fit, v_fit, amp_fit, phase_fit, v_fit_err, amp_fit_err, fit_count, fit_outlier_frac, outlier = \n    lsqfit_annual(v, v_err, mid_date, date_dt; mad_thresh, iterations, model)\n\nArguments\n\nv::Vector{Any}: image-pair (discrete interval) velocity\nv_err::Vector{Any}: image-pair (discrete interval) velocity error\nmid_date::Vector{DateTime}: center date of image-pair [] \ndate_dt::Vector{Any}: time seperation between image pairs [days]\nmad_thresh::Number: optional key word argument for MAD treshold for outlier rejection\niterations::Number: optional key word argument for number of iterations for lsqfit_annual outlier rejection\nmodel::String: optional key word argument giving name of lsq model. Valid options are \"sinusoidal_interannual\", \"sinusoidal\", \"interannual\".\nt_fit: DateTime center of annual fit\nv_fit: annual values determined from lsq fit\namp_fit: seasonal amplitude\nphase_fit: seasonal amplitude [DateTime of maximum flow]\nv_fit_err: error of v_fit\namp_fit_err: error of amp_fit\nfit_count: data count for each year, after any outlier rejection\nfit_outlier_frac: fraction of data remove by outlier rejection\noutlier: BitVector of length of v indicating identified outliers\n\nAuthor\n\nAlex S. Gardner and Chad A. Greene, JPL, Caltech.\n\n\n\n\n\n","category":"function"},{"location":"","page":"ItsLive.jl","title":"ItsLive.jl","text":"ItsLive.lsqfit_interp","category":"page"},{"location":"#ItsLive.lsqfit_interp","page":"ItsLive.jl","title":"ItsLive.lsqfit_interp","text":"vi, vierr = lsqfitinterp(tfit, vfit, ampfit, phasefit, vfiterr, ampfiterr, t_i)\n\ncreate a continuous time series of velocity from the outputs of ItsLive.lsqfit.\n\nExample\n\njulia> v_i, v_i_err = lsqfit_interp(t_fit, v_fit, amp_fit, phase_fit, v_fit_err, amp_fit_err, t_i)\n\nArguments\n\nt_fit:::Vector{DateTime}: date of v_fit\nv_fit::Vector{Any}: mean annual v\namp_fit::Vector{Any}: amplitude of seasonal cycle\nphase_fit::Vector{Any}: phase of seasonal cycle\nv_fit_err::Vector{Any}: error in mean annual v\namp_fit_err::Vector{Any}: error in amplitude of seasonal cycle\nt_i:::Vector{DateTime}: dates to interpolate to\n\nAuthor\n\nAlex S. Gardner and Chad A. Greene, JPL, Caltech.\n\n\n\n\n\n","category":"function"},{"location":"","page":"ItsLive.jl","title":"ItsLive.jl","text":"ItsLive.binstats","category":"page"},{"location":"#ItsLive.binstats","page":"ItsLive.jl","title":"ItsLive.binstats","text":"yb, ybstd, countb, bincenters = binstats(x, y; binedges = [0.0], dx = 0, method = \"mean\")\n\nreturn the central value (`yb`) and spread (`ybstd`) in `x` according to `method` [\"mean\" = default]\nargument on values binned by `y`.\n\nExample no inputs\n\njulia> yb, ybstd, countb, bincenters = binstats(x, y; dx = 1)\n\nArguments\n\nx::Vector{Float64}: x data [typically DateTime]\ny::Vector{Float64}: data to be binned\ndt::Number: width of x bins [dt or binedges must be provided]\nbinedges::Vector{Float64}: x bin edges [dt or binedges must be provided]\nmethod::String: method for deter\nskipspread::Bool: flag for skipping spread calculations\n\nAuthor\n\nAlex S. Gardner, JPL, Caltech.\n\n\n\n\n\n","category":"function"},{"location":"","page":"ItsLive.jl","title":"ItsLive.jl","text":"ItsLive.running_mean","category":"page"},{"location":"#ItsLive.running_mean","page":"ItsLive.jl","title":"ItsLive.running_mean","text":"runmean = running_mean(v, w)\n\nreturn the running mean (runmean) of v using kernel width w\n\n\n\n\n\n","category":"function"},{"location":"","page":"ItsLive.jl","title":"ItsLive.jl","text":"ItsLive.decimalyear","category":"page"},{"location":"#ItsLive.decimalyear","page":"ItsLive.jl","title":"ItsLive.decimalyear","text":"decyear = decimalyear(datetime)\n\nreturn the decimal year (decyear) of a DateTime type vector\n\nExample\n\n    julia> decyear = ItsLive.decimalyear(Dates.DateTime(1970,1,1))\n    1970.0\n\nArguments\n\ndatetime::Union{DateTime, Vector{DateTime}}: date and time of type DateTime \n\nAuthor\n\nAlex S. Gardner, JPL, Caltech.\n\n\n\n\n\n","category":"function"},{"location":"","page":"ItsLive.jl","title":"ItsLive.jl","text":"ItsLive.intersect","category":"page"},{"location":"#ItsLive.intersect","page":"ItsLive.jl","title":"ItsLive.intersect","text":"rownumber = intersect(lat,lon, catalogdf])\n\nreturn the rownumber of the the DataFrame catalog (catalogdf) of the ITS_LIVE zarr datacubes  that intersects the provided latitude and longituded [decimal degrees].\n\nuse catalog.jl to generate the DataFrame catalog of the ITS_LIVE zarr datacubes\n\nusing ArchGDAL, DataFrames\n\nExample\n\njulia> intersect(69.1,-49.4, catalogdf)\n\nArguments\n\nlat::Number: latitude between -90 and 90 degrees\nlon::Number: latitude between -180 and 180 degrees\ncatalogdf::DataFrame: DataFrame catalog of the ITS_LIVE zarr datacubes\n\nAuthor\n\nAlex S. Gardner, JPL, Caltech.\n\n\n\n\n\n","category":"function"},{"location":"","page":"ItsLive.jl","title":"ItsLive.jl","text":"ItsLive.nearestxy","category":"page"},{"location":"#ItsLive.nearestxy","page":"ItsLive.jl","title":"ItsLive.nearestxy","text":"xind, yind = nearestxy(lat,lon,dc)\n\nreturn the xind/yind indices into a ZarrGroup (dc) for the points nearest the provided lat, lon locations\n\nusing Proj4\n\nExample\n\njulia> nearestxy(lat,lon,dc)\n\nArguments\n\nlat::::Union{Vector,Number}: latitude between -90 and 90 degrees\nlon::::Union{Vector,Number}: latitude between -180 and 180 degrees\ndc:::ZGroup{Zarr.ConsolidatedStore{Zarr.HTTPStore}}: ITS_LIVE data cube:: Zarr DataArray \n\nAuthor\n\nAlex S. Gardner, JPL, Caltech.\n\n\n\n\n\n","category":"function"},{"location":"","page":"ItsLive.jl","title":"ItsLive.jl","text":"ItsLive.dtfilter","category":"page"},{"location":"#ItsLive.dtfilter","page":"ItsLive.jl","title":"ItsLive.dtfilter","text":"dtmax = dtfilter(x,dt,binedges)\n\nreturn the maximum dt (dtmax) for which the distribution of x shows no statistical difference from the distribution of x in the minimum dt bin\n\nThis filter is needed to identify longer dts that exhibit \"skipping\" or \"locking\" behavior in feature tracking estimates of surface flow. This happens when the surface texture provides a lesser match than to stationary features, due to long time separation between repeat images, such as ice falls and curved medial moraines.\n\nusing Statistics\n\nExample\n\njulia> dtfilter(vx,dt,binedge)\n\nArguments\n\nx::Vector{Any}: value to be filtered as a function of dt (typically velocity)\ndt::Vector{Any}: time seperation between image pairs [days]\nbinedges::Vector{Float64}: optional edges of dt bins into which vx and vy will be grouped and compared\ndtbin_mad_thresh::Number: used to determine in dt means are significantly different\n\nAuthor\n\nAlex S. Gardner, JPL, Caltech.\n\n\n\n\n\n","category":"function"},{"location":"","page":"ItsLive.jl","title":"ItsLive.jl","text":"ItsLive.design_matrix","category":"page"},{"location":"#ItsLive.design_matrix","page":"ItsLive.jl","title":"ItsLive.design_matrix","text":"D, tD, M = design_matrix(t1,t2, model [optional])\n\ncreate a design matrix (D) for discrete interval data\n\nExample\n\njulia> D, tD, M = design_matrix(t1,t2, model [optional])\n\nArguments\n\nt1::Vector{DateTime}: start DateTime of descrete interval \nt2::Vector{DateTime}: end DateTime of descrete interval \nmodel::String = \"sinusoidal_interannual\":\nD: Design matrix\ntD: DateTime centers used in D\nM = Annual weighting matrix`:\n\nAuthor\n\nAlex S. Gardner and Chad A. Greene, JPL, Caltech.\n\n\n\n\n\n","category":"function"},{"location":"","page":"ItsLive.jl","title":"ItsLive.jl","text":"ItsLive.annual_matrix","category":"page"},{"location":"#ItsLive.annual_matrix","page":"ItsLive.jl","title":"ItsLive.annual_matrix","text":"annual_matrix(t1,t2)\n\ncreate an annual weighting matrix for discrete intervals\n\nExample\n\njulia> M, tM = annual_matrix(t1,t2)\n\nArguments\n\nt1::Vector{DateTime}: start DateTime of descrete interval \nt2::Vector{DateTime}: end DateTime of descrete interval \n\nAuthor\n\nAlex S. Gardner and Chad A. Greene, JPL, Caltech.\n\n\n\n\n\n","category":"function"},{"location":"","page":"ItsLive.jl","title":"ItsLive.jl","text":"ItsLive.wlinearfit","category":"page"},{"location":"#ItsLive.wlinearfit","page":"ItsLive.jl","title":"ItsLive.wlinearfit","text":"offset, slope, error = wliearfit(t, v, v_err, datetime0)\n\nreturn the offset, slope, and error for a weighted linear fit to v with an intercept of datetime0\n\nExample no inputs\n\njulia> offset, slope, error = wliearfit(t, v, v_err, datetime0)\n\nArguments\n\nt::Vector{DateTime}: date of input estimates\nv::Vector{Float64}: estimates\nv_err::Vector{Float64}: estimate errors\ndatetime0::DateTime): model intercept\n\nAuthor\n\nAlex S. Gardner, JPL, Caltech.\n\n\n\n\n\n","category":"function"},{"location":"","page":"ItsLive.jl","title":"ItsLive.jl","text":"ItsLive.annual_magnitude","category":"page"},{"location":"#ItsLive.annual_magnitude","page":"ItsLive.jl","title":"ItsLive.annual_magnitude","text":"v_fit, v_fit_err, v_fit_count, v_fit_outlier_frac  = annual_magnitude(vx0, vy0, vx_fit, vy_fit, vx_fit_err, vy_fit_err, vx_fit_count, vy_fit_count, vx_fit_outlier_frac, vy_fit_outlier_frac)\n\nreturn the annual mean, error, count, and outlier fraction from component values projected on the unit flow  vector defined by vx0 and vy0\n\nExample no inputs\n\njulia>  annual_magnitude(vx0, vy0, vx_fit, vy_fit, vx_fit_err, vy_fit_err, vx_fit_count, vx_fit_count, vx_fit_outlier_frac, vy_fit_outlier_frac)\n\nArguments\n\n- `vx0::Number`: mean flow in x direction\n- `vy0::Number`: mean flow in y direction\n- `vx_fit::Vector`: annual mean flow in x direction\n- `vy_fit::Vector`: annual mean flow in y direction\n- `vx_fit_err::Vector`: error in annual mean flow in x direction\n- `vy_fit_err::Vector`: error in annual mean flow in y direction\n- `vx_fit_count::Vector`: number of values used to determine annual mean flow in x direction\n- `vy_fit_count::Vector`: number of values used to determine annual mean flow in y direction\n- `vx_fit_outlier_frac::Vector`: fraction of data identified as outliers and removed when calculating annual mean flow in x direction\n- `vy_fit_outlier_frac::Vector`: fraction of data identified as outliers and removed when calculating annual mean flow in y direction\n\nAuthor\n\nAlex S. Gardner and Chad A. Greene, JPL, Caltech.\n\n\n\n\n\n","category":"function"},{"location":"","page":"ItsLive.jl","title":"ItsLive.jl","text":"ItsLive.climatology_magnitude","category":"page"},{"location":"#ItsLive.climatology_magnitude","page":"ItsLive.jl","title":"ItsLive.climatology_magnitude","text":"climatology_magnitude(vx0, vy0, vx0_err, vy0_err, dvx_dt, dvy_dt, vx_amp, vy_amp, vx_amp_err, vy_amp_err, vx_phase, vy_phase)\n\nreturn the mean, trend, seasonal amplitude, error in seasonal amplitude, and seasonal phase from component values projected on the unit flow  vector defined by vx0 and vy0\n\nExample no inputs\n\njulia> v, v_err, dv_dt, v_amp, v_amp_err, v_phase = climatology_magnitude(vx0, vy0, vx0_err, vy0_err, dvx_dt, dvy_dt, vx_amp, vy_amp, vx_amp_err, vy_amp_err, vx_phase, vy_phase)\n\nArguments\n\nvx0::Number: mean flow in x direction\nvy0::Number: mean flow in y direction\nvx0_err::Number: error in mean flow in x direction\nvy0_err::Number: error in mean flow in y direction\ndvx_dt::Number: trend in flow in x direction\ndvy_dt::Number: trend in flow in y direction\nvx_amp::Number: seasonal amplitude in x direction\nvy_amp::Number: seasonal amplitude in y direction \nvx_amp_err::Number: error in seasonal amplitude in x direction\nvy_amp_err::Number: error in seasonal amplitude in y direction \nvx_phase::Number: seasonal phase in x direction [day of maximum flow]\nvy_phase::Number: seasonal phase in y direction [day of maximum flow]\n\nAuthor\n\nAlex S. Gardner, JPL, Caltech.\n\n\n\n\n\n","category":"function"},{"location":"","page":"ItsLive.jl","title":"ItsLive.jl","text":"ItsLive.sensorgroup","category":"page"},{"location":"#ItsLive.sensorgroup","page":"ItsLive.jl","title":"ItsLive.sensorgroup","text":"id, sensorgroups= sensorgroup(sensor)\n\nreturn the sensor group id and the corresponding sensorgroups\n\nusing Statistics\n\nExample\n\njulia> id, sensorgroups = sensorgroup(sensor)\n\nArguments\n\nsensor::Vector{Any}: sensor list\n\nAuthor\n\nAlex S. Gardner, JPL, Caltech.\n\n\n\n\n\n","category":"function"}]
}
